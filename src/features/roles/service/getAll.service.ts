import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {Roles} from "../types/roles";
import RoleModel from "../lib/RolesModel";

export default async function getAllRoles(): Promise<
    [Roles[] | RespCommon, ResponseInit]
> {
    try {
        const roles = await RoleModel.findMany({
            include: {
                Permissions: true,
            },
        });
        return [roles, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
