import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import ResourceModel from "../../lib/ResourceModel";
import {RespCommon} from "@/types/Resp";
import FolderModel from "../../lib/FolderModel";
import {GetResource} from "../../types/userResource";

export default async function getResource(
    id: number,
    folderId?: string
): Promise<[GetResource | RespCommon, ResponseInit]> {
    try {
        if (folderId) {
            const folder = await FolderModel.findUnique({
                select: {
                    id: true,
                    name: true,
                    parentId: true,
                    Resources: {
                        select: {
                            id: true,
                            url: true,
                            type: true,
                            resourceId: true,
                        },
                    },
                    children: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                where: {
                    id: folderId,
                    usersId: id,
                },
            });
            if (!folder) {
                return [{message: "NotFound Folder"}, {status: 404}];
            }
            return [folder, {status: 200}];
        } else {
            const folder = await FolderModel.findMany({
                select: {
                    id: true,
                    name: true,
                },
                where: {
                    usersId: id,
                    parentId: null,
                },
            });
            const resources = await ResourceModel.findMany({
                select: {
                    id: true,
                    url: true,
                    type: true,
                    resourceId: true,
                },
                where: {
                    userId: id,
                    usersFoldersId: null,
                },
            });
            return [
                {
                    name: "",
                    Resources: resources,
                    children: folder,
                },
                {status: 200},
            ];
        }
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
