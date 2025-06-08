import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {RoleForm, Roles} from "../types/roles";
import RoleModel from "../lib/RolesModel";
import PermissionsModel from "../lib/PermissionsModel";

export default async function createRol(
    body: RoleForm
): Promise<[Roles | RespCommon, ResponseInit]> {
    try {
        const {Permissions, ...data} = body;
        const Role = await RoleModel.create({
            data: data,
        });
        await PermissionsModel.createMany({
            data: Permissions.map((p) => ({
                roleId: Role.id,
                permission: p.permission,
            })),
        });
        return [Role, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
