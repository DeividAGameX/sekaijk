import {Prisma} from "@prisma/client";
import PostModel from "@/features/posts/lib/PostModel";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import Categories from "@/features/categories/lib/CategoriesModel";

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

export default async function getAllPost(
    slug: string,
    page: number = 0,
    limit: number = 10,
    search: string | null = null,
    order: Prisma.PostsOrderByWithAggregationInput = {createdAt: "asc"}
): Promise<
    [{data: Post[]; count: number; pages: number} | RespCommon, ResponseInit]
> {
    try {
        const category = await Categories.findUnique({
            where: {
                slug: slug,
            },
        });
        if (!category) {
            return [{message: "Category not found"}, {status: 404}];
        }
        const where: Prisma.PostsWhereInput = {
            draftId: {
                not: null,
            },
            slug: {
                not: null,
            },
            categoryId: category.id,
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
        const count = await PostModel.count({
            where,
        });
        const data = await PostModel.findMany({
            select: {
                title: true,
                description: true,
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
            take: limit,
            skip: limit * page,
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
