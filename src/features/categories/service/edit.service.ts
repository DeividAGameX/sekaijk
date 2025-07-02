import {RespCommon} from "@/types/Resp";
import {Category, CategoryForm} from "@/features/categories/types/category";
import categories from "@/features/categories/lib/CategoriesModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";

export default async function editCategories(
    id: number,
    body: CategoryForm
): Promise<[Category | RespCommon, ResponseInit]> {
    try {
        const result = await categories.update({
            where: {
                id,
            },
            data: body,
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
