import {RespCommon} from "@/types/Resp";
import {Tag} from "@/features/tags/types/tag";
import TagModel from "@/features/tags/lib/TagModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function deleteTag(
    id: number
): Promise<[Tag | RespCommon, ResponseInit]> {
    try {
        const tag = await TagModel.delete({
            where: {
                id,
            },
        });
        return [tag, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
