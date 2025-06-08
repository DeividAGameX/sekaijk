import {validateErrorPrisma} from "@/utils/validateError";
import CategoriesModel from "@/features/categories/lib/CategoriesModel";
import {Prisma} from "@prisma/client";
import {Category} from "../types/category";
import {RespCommon} from "@/types/Resp";

export default async function getAllCategories(): Promise<
    [Category[] | RespCommon, ResponseInit]
> {
    try {
        const categories = await CategoriesModel.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return [categories, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
