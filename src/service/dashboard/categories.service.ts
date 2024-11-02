import {prisma as PrismaClient} from "@/lib/prisma";
import {validateError} from "@/utils/ServerError";
import {revalidatePath} from "next/cache";
import slugify from "slugify"; // Importar slugify

const prisma = PrismaClient.$extends({
    query: {
        categories: {
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

export async function getCategories() {
    try {
        const categories = await prisma.categories.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return {
            response: categories,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getCategoryById(id: string) {
    try {
        const category = await prisma.categories.findUnique({
            where: {id: parseInt(id)},
        });
        return {
            response: category,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function createCategory(data: any) {
    try {
        const category = await prisma.categories.create({
            data: {...data, slug: ""},
        });
        revalidatePath(`/${category.slug}`);
        return {
            response: category,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function updateCategory(id: string, data: any) {
    try {
        // Crear el slug a partir del nombre si se proporciona
        const category = await prisma.categories.update({
            where: {id: parseInt(id)},
            data,
        });
        revalidatePath(`/${category.slug}`);
        return {
            response: category,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteCategory(id: string) {
    try {
        const category = await prisma.categories.delete({
            where: {id: parseInt(id)},
        });
        return {
            response: category,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}
