import {validateErrorPrisma} from "@/utils/validateError";
import FolderModel from "../../lib/FolderModel";
import {Prisma} from "@prisma/client";
import {RespCommon} from "@/types/Resp";
import {FolderResource} from "../../types/userResource";

interface FolderResourceForm {
    name: string;
    parentId: string | null;
    usersId: number;
}

export default async function createFolder(
    body: FolderResourceForm
): Promise<[FolderResource | RespCommon, ResponseInit]> {
    try {
        const userResource = await FolderModel.create({
            data: body,
        });
        return [userResource, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
