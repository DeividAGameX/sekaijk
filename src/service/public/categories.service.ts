import {prisma} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";

export async function getPostByCategory(
    slug: string,
    page: number = 0,
    search: string
): Promise<ReturnType> {
    try {
        let whereExtra = {};
        if (search) {
            whereExtra = {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        description: {
                            contains: search,
                        },
                    },
                ],
            };
        }
        const category = await prisma.categories.findFirst({
            where: {
                slug: slug,
            },
        });
        if (!category) {
            return {
                response: {
                    message: "Categoría no encontrada",
                },
                status: {status: 404},
            };
        }
        const categoriesCount = await prisma.posts.count({
            where: {
                categoryId: category.id,
                slug: {
                    not: null,
                },
                draft: {
                    not: null,
                },
                ...whereExtra,
            },
        });
        const posts = await prisma.posts.findMany({
            select: {
                slug: true,
                title: true,
                banner: true,
                description: true,
                createdAt: true,
                author: {
                    select: {
                        slug: true,
                        name: true,
                        avatar: true,
                    },
                },
            },
            where: {
                categoryId: category.id,
                slug: {
                    not: null,
                },
                draft: {
                    not: null,
                },
                ...whereExtra,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: page * 10,
            take: 10,
        });
        return {
            response: {
                posts: posts,
                count: categoriesCount,
            },
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}
