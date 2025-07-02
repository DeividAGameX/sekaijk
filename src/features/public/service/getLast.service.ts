import {Prisma} from "@prisma/client";
import PostModel from "@/features/posts/lib/PostModel";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";

interface Post {
    title: string;
    banner?: string | null;
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

export default async function getLast(
    slugIgnore?: string[]
): Promise<[Post[] | RespCommon, ResponseInit]> {
    try {
        const where: Prisma.PostsWhereInput = {
            draftId: {
                not: null,
            },
            slug: {
                not: null,
            },
        };
        if (slugIgnore) {
            where.slug = {
                notIn: slugIgnore,
            };
        }
        const data = await PostModel.findMany({
            select: {
                title: true,
                banner: true,
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
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
        });
        return [data, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
