import {Prisma} from "@prisma/client";
import PostModel from "@/features/posts/lib/PostModel";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import UsersModel from "@/features/users/lib/UsersModel";

interface Post {
    title: string;
    banner?: string | null;
    description: string;
    slug?: string | null;
    createdAt: Date;
    Categories: {
        name: string;
        slug: string;
    } | null;
    author: {
        name: string;
        avatar: string;
    };
}

interface PostReturn {
    data: Post[];
    count: number;
    pages: number;
}

export default async function getLastUserPost(
    userSlug: string,
    page: number = 0,
    limit: number = 12,
    search: string | null = null,
    order: Prisma.PostsOrderByWithAggregationInput = {createdAt: "asc"}
): Promise<[PostReturn | RespCommon, ResponseInit]> {
    try {
        const where: Prisma.PostsWhereInput = {
            draftId: {
                not: null,
            },
            slug: {
                not: null,
            },
        };
        const user = await UsersModel.findFirst({
            where: {
                slug: userSlug,
            },
        });
        if (!user) return [{message: "User not found"}, {status: 404}];
        where.authorId = user.id;
        if (search)
            where.OR = [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];
        const count = await PostModel.count({
            where,
        });
        const data = await PostModel.findMany({
            select: {
                title: true,
                banner: true,
                description: true,
                slug: true,
                createdAt: true,
                Categories: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
            where,
            skip: limit * page,
            take: limit,
            orderBy: order,
        });
        const pages = Math.ceil(count / limit);
        return [{data, count, pages}, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
