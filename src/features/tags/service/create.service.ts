import {RespCommon} from "@/types/Resp";
import {Tag, TagForm} from "@/features/tags/types/tag";
import TagModel from "@/features/tags/lib/TagModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function createTag(
    body: TagForm
): Promise<[Tag | RespCommon, ResponseInit]> {
    try {
        const tag = await TagModel.create({
            data: body,
        });
        return [tag, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
