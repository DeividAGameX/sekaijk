import {RespCommon} from "@/types/Resp";
import {FolderResource} from "../../types/userResource";
import FolderModel from "../../lib/FolderModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function deleteFolder(
    id: string
): Promise<[FolderResource | RespCommon, ResponseInit]> {
    try {
        const userResource = await FolderModel.delete({
            where: {
                id,
            },
        });

        return [userResource, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
