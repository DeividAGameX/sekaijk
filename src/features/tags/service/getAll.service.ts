import {RespCommon} from "@/types/Resp";
import {Tag} from "@/features/tags/types/tag";
import TagModel from "@/features/tags/lib/TagModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function getAllTags(): Promise<
    [Tag[] | RespCommon, ResponseInit]
> {
    try {
        const tags = await TagModel.findMany();
        return [tags, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
