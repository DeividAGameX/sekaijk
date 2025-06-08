import {Prisma} from "@prisma/client";
import PostModel from "@/features/posts/lib/PostModel";
import {Post} from "@/features/posts/types/posts";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";

export default async function getAllPost(
    page: number = 0,
    limit: number = 10,
    search: string | null = null,
    onlyMe: number | null = null,
    order: Prisma.PostsOrderByWithAggregationInput = {createdAt: "asc"}
): Promise<
    [{data: Post[]; count: number; pages: number} | RespCommon, ResponseInit]
> {
    try {
        const where: Prisma.PostsWhereInput = {
            draftId: null,
        };
        if (search) {
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
        }
        if (onlyMe) {
            where.authorId = onlyMe;
        }
        const count = await PostModel.count({
            where,
        });
        const data = await PostModel.findMany({
            where,
            include: {
                Tags: {
                    select: {
                        name: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
                Categories: {
                    select: {
                        name: true,
                    },
                },
            },
            take: limit,
            skip: limit * page,
            orderBy: order,
        });
        const pages = Math.ceil(count / limit);
        return [{data, count, pages}, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
