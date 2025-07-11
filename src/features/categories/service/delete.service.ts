import {RespCommon} from "@/types/Resp";
import {Category} from "@/features/categories/types/category";
import categories from "@/features/categories/lib/CategoriesModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";

export default async function deleteCategories(
    id: number
): Promise<[Category | RespCommon, ResponseInit]> {
    try {
        const result = await categories.delete({
            where: {
                id,
            },
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
