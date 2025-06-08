import {RespCommon} from "@/types/Resp";
import {TeamRole} from "../types/teamRole";
import TeamRoleModel from "../lib/TeamRoleModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function deleteTeamRole(
    id: number
): Promise<[TeamRole | RespCommon, ResponseInit]> {
    try {
        const teamRole = await TeamRoleModel.delete({
            where: {
                id,
            },
        });
        return [teamRole, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
