import {validateErrorPrisma} from "@/utils/validateError";
import categories from "@/features/categories/lib/CategoriesModel";
import {Category, CategoryForm} from "@/features/categories/types/category";
import {Prisma} from "@prisma/client";
import {RespCommon} from "@/types/Resp";
import {revalidatePath} from "next/cache";

export default async function createCategories(
    body: CategoryForm
): Promise<[Category | RespCommon, ResponseInit]> {
    try {
        const result = await categories.create({
            data: {...body, slug: ""},
        });
        revalidatePath(`/${result.slug}`);
        revalidatePath("/", "layout");
        return [result, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
