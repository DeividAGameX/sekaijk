import {RespCommon} from "@/types/Resp";
import {Prisma, TeamRole} from "@prisma/client";
import TeamRoleModel from "../lib/TeamRoleModel";
import {validateErrorPrisma} from "@/utils/validateError";

export default async function getTeamRole(
    id: number
): Promise<[TeamRole | RespCommon, ResponseInit]> {
    try {
        const teamRole = await TeamRoleModel.findUnique({
            where: {
                id,
            },
        });
        if (!teamRole) {
            return [{message: "notFound"}, {status: 404}];
        }
        return [teamRole, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
