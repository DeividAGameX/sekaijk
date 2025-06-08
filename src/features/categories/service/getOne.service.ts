import {RespCommon} from "@/types/Resp";
import {Category} from "../types/category";
import categories from "../lib/CategoriesModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function getElementById(
    id: number
): Promise<[Category | RespCommon, ResponseInit]> {
    try {
        const item = await categories.findUnique({
            where: {
                id,
            },
        });
        if (!item) {
            return [{message: "notFound"}, {status: 404}];
        }
        return [item, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
