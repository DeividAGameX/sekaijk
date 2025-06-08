import {RespCommon} from "@/types/Resp";
import {Prisma} from "@prisma/client";
import {Roles} from "../types/roles";
import RoleModel from "../lib/RolesModel";
import {validateErrorPrisma} from "@/utils/validateError";
import PermissionsModel from "../lib/PermissionsModel";

export default async function deleteRol(
    id: number
): Promise<[Roles | RespCommon, ResponseInit]> {
    try {
        const rol = await RoleModel.delete({
            where: {
                id,
            },
        });
        await PermissionsModel.deleteMany({
            where: {
                roleId: id,
            },
        });
        return [rol, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
