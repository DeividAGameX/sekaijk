import {prisma as PrismaClient} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";
import {revalidatePath} from "next/cache";
import slugify from "slugify";

const prisma = PrismaClient.$extends({
    query: {
        users: {
            create({args, query}) {
                if (args.data.name) {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }
                return query(args);
            },
            update({args, query}) {
                if (args.data.name && typeof args.data.name === "string") {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }
                return query(args);
            },
        },
    },
});

export async function getProfile(id: string): Promise<ReturnType> {
    try {
        const profile = await prisma.users.findUnique({
            where: {id: parseInt(id)},
            include: {
                Roles: true,
                social: true,
            },
        });
        return {
            response: profile,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getPost(id: string): Promise<ReturnType> {
    try {
        const posts = await prisma.posts.findMany({
            select: {
                id: true,
                title: true,
                banner: true,
                description: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                Categories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                Tags: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            where: {
                authorId: parseInt(id),
                draft: null,
            },
        });
        return {
            response: posts,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function editProfile(id: string, data: any): Promise<ReturnType> {
    try {
        const user = await prisma.users.update({
            where: {id: parseInt(id)},
            data,
        });
        if (user.isPublic) {
            revalidatePath(`/team`);
            revalidatePath(`/team/${user.slug}`);
        }
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function addSocial(id: string, data: any): Promise<ReturnType> {
    try {
        const social = await prisma.social.create({
            data: {
                ...data,
                userId: parseInt(id),
            },
        });
        const user = await prisma.users.findUnique({
            where: {id: parseInt(id)},
        });
        if (user) {
            if (user.isPublic) {
                revalidatePath(`/team`);
                revalidatePath(`/team/${user.slug}`);
            }
        }
        return {
            response: social,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteSocial(id: string): Promise<ReturnType> {
    try {
        await prisma.social.delete({
            where: {id: parseInt(id)},
        });
        const user = await prisma.users.findUnique({
            where: {id: parseInt(id)},
        });
        if (user) {
            if (user.isPublic) {
                revalidatePath(`/team`);
                revalidatePath(`/team/${user.slug}`);
            }
        }
        return {
            response: null,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}
