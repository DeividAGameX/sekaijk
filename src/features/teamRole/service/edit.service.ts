import {RespCommon} from "@/types/Resp";
import {TeamRole, TeamRoleForm} from "../types/teamRole";
import TeamRoleModel from "../lib/TeamRoleModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";

export default async function editTeamRole(
    id: number,
    body: TeamRoleForm
): Promise<[TeamRole | RespCommon, ResponseInit]> {
    try {
        const teamRole = await TeamRoleModel.update({
            where: {
                id,
            },
            data: body,
        });
        revalidatePath("/team");
        return [teamRole, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
