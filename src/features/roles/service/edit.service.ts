import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {RoleForm, Roles} from "../types/roles";
import RoleModel from "../lib/RolesModel";
import PermissionsModel from "../lib/PermissionsModel";

export default async function editRol(
    id: number,
    body: RoleForm
): Promise<[Roles | RespCommon, ResponseInit]> {
    try {
        const {Permissions, ...data} = body;
        const rol = await RoleModel.update({
            where: {
                id,
            },
            data: data,
        });
        if (!rol) {
            return [{message: "Role not found"}, {status: 404}];
        }
        if (Permissions) {
            await PermissionsModel.deleteMany({
                where: {
                    roleId: id,
                },
            });
            await PermissionsModel.createMany({
                data: Permissions.map((p) => ({
                    roleId: rol.id,
                    permission: p.permission,
                })),
            });
        }
        return [rol, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
