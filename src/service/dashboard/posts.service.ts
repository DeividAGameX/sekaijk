import {createPostScheme} from "@/scheme/posts";
import {prisma as PrismaClient} from "@/lib/prisma";
import {validateError} from "@/utils/ServerError";
import slugify from "slugify";
import {ReturnType} from "@/types/api/response";
import {revalidatePath} from "next/cache";

const prisma = PrismaClient.$extends({
    query: {
        posts: {
            create({args, query}) {
                if (args.data.draft) {
                    if (args.data.title) {
                        args.data.slug = slugify(args.data.title, {
                            lower: true,
                            strict: true,
                        });
                    }
                }
                return query(args);
            },
            update({args, query}) {
                if (args.data.draft) {
                    if (
                        args.data.title &&
                        typeof args.data.title === "string"
                    ) {
                        args.data.slug = slugify(args.data.title, {
                            lower: true,
                            strict: true,
                        });
                    }
                }
                return query(args);
            },
        },
    },
});

export const getPosts = async (
    page: number = 0,
    limit: number = 10,
    search: string = "",
    categories: any[] = [],
    order: string[] = ["createdAt", "asc"]
): Promise<ReturnType> => {
    try {
        const query: any = {};
        if (search) {
            const searchQuery = `%${search}%`;
            query.OR = [
                {title: {contains: searchQuery}},
                {description: {contains: searchQuery}},
            ];
        }
        if (categories.length > 0) {
            query.categoryId = {in: categories.map((c) => parseInt(c))};
        }
        if (query.OR || query.categoryId) {
            const count = await prisma.posts.count({
                where: {...query, draft: null},
            });
            const result = await prisma.posts.findMany({
                skip: page * limit,
                take: limit,
                where: {...query, draft: null},
                orderBy: {
                    [order[0]]: order[1],
                },
                include: {
                    author: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return {
                response: {
                    count,
                    pages: Math.ceil(count / limit),
                    data: result,
                },
                status: {status: 200},
            };
        }
        const count = await prisma.posts.count({
            where: {
                draft: null,
            },
        });
        const result = await prisma.posts.findMany({
            skip: page * limit,
            take: limit,
            where: {
                draft: null,
            },
            orderBy: {
                [order[0]]: order[1],
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return {
            response: {
                count,
                pages: Math.ceil(count / limit),
                data: result,
            },
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const getPostById = async (id: string): Promise<ReturnType> => {
    try {
        const result = await prisma.posts.findUnique({
            where: {
                id: parseInt(id),
                draft: null,
            },
            include: {
                Tags: {select: {id: true}},
            },
        });
        return {
            response: result,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const createPost = async (
    body: any,
    authenticate: any
): Promise<ReturnType> => {
    try {
        const value = await createPostScheme.validate(body);
        const result = await prisma.posts.create({
            data: {
                title: value.title,
                description: value.description,
                authorId: parseInt(authenticate.sub),
            },
        });
        return {
            response: {
                message: "success",
                id: result.id,
            },
            status: {status: 201},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const deletePost = async (id: string): Promise<ReturnType> => {
    try {
        await prisma.posts.delete({
            where: {
                id: parseInt(id),
            },
        });
        return {
            response: {
                message: "success",
            },
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const savePost = async (id: string, data: any): Promise<ReturnType> => {
    try {
        const {Tags, ...body} = data;
        const oldTags = (
            await prisma.posts.findUnique({
                where: {id: parseInt(id)},
                include: {
                    Tags: true,
                },
            })
        )?.Tags.map((tag) => ({id: tag.id}));
        await prisma.posts.update({
            where: {
                id: parseInt(id),
            },
            data: {
                ...body,
                Tags: {
                    disconnect: oldTags,
                    connect: Tags.map((i: any) => ({id: i})),
                },
            },
            include: {
                Tags: true,
            },
        });
        return {
            response: {
                message: "success",
            },
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const publishPost = async (
    id: string,
    data: any,
    authenticate: any
): Promise<ReturnType> => {
    try {
        const publishInfo = await prisma.posts.findFirst({
            where: {
                draft: parseInt(id),
            },
        });
        if (publishInfo) {
            const {Tags, ...body} = data;
            const oldTags = (
                await prisma.posts.findUnique({
                    where: {id: parseInt(id)},
                    include: {
                        Tags: true,
                    },
                })
            )?.Tags.map((tag) => ({id: tag.id}));
            const updateTemp = await prisma.posts.update({
                where: {
                    id: publishInfo.id,
                },
                data: {
                    ...body,
                    Tags: {
                        disconnect: oldTags,
                        connect: Tags.map((i: any) => ({id: i})),
                    },
                },
                include: {
                    Tags: true,
                },
            });
            await prisma.posts.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    ...body,
                    status: "PUBLISHED",
                    Tags: {
                        disconnect: oldTags,
                        connect: Tags.map((i: any) => ({id: i})),
                    },
                },
                include: {
                    Tags: true,
                },
            });
            const updated = await prisma.posts.findUnique({
                select: {
                    slug: true,
                    Categories: {
                        select: {
                            slug: true,
                        },
                    },
                },
                where: {
                    id: updateTemp.id,
                },
            });
            revalidatePath(`/${updated?.slug}/${updated?.slug}`);
            return {
                response: {
                    message: "publishedUpdated",
                },
                status: {status: 200},
            };
        } else {
            const {Tags, ...body} = data;
            const oldTags = (
                await prisma.posts.findUnique({
                    where: {id: parseInt(id)},
                    include: {
                        Tags: true,
                    },
                })
            )?.Tags.map((tag) => ({id: tag.id}));
            const updateTemp = await prisma.posts.create({
                data: {
                    ...body,
                    Tags: {
                        connect: Tags.map((i: any) => ({id: i})),
                    },
                    status: "PUBLISHED",
                    authorId: parseInt(authenticate.sub),
                    draft: parseInt(id),
                },
                include: {
                    Tags: true,
                },
            });
            await prisma.posts.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    ...body,
                    status: "PUBLISHED",
                    Tags: {
                        disconnect: oldTags,
                        connect: Tags.map((i: any) => ({id: i})),
                    },
                },
                include: {
                    Tags: true,
                },
            });
            const updated = await prisma.posts.findUnique({
                select: {
                    slug: true,
                    Categories: {
                        select: {
                            slug: true,
                        },
                    },
                },
                where: {
                    id: updateTemp.id,
                },
            });
            revalidatePath(`/${updated?.slug}/${updated?.slug}`);
            return {
                response: {
                    message: "publishedOk",
                },
                status: {status: 200},
            };
        }
    } catch (error) {
        return validateError(error);
    }
};
