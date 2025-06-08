import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {Roles} from "../types/roles";
import RoleModel from "../lib/RolesModel";

export default async function getRol(
    id: number
): Promise<[Roles | RespCommon, ResponseInit]> {
    try {
        const rol = await RoleModel.findUnique({
            where: {
                id,
            },
            include: {
                Permissions: true,
            },
        });
        if (!rol) {
            return [{message: "notFound"}, {status: 404}];
        }
        return [rol, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
