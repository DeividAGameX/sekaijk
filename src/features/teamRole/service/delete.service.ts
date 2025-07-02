import {RespCommon} from "@/types/Resp";
import {TeamRole} from "../types/teamRole";
import TeamRoleModel from "../lib/TeamRoleModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";

export default async function deleteTeamRole(
    id: number
): Promise<[TeamRole | RespCommon, ResponseInit]> {
    try {
        const teamRole = await TeamRoleModel.delete({
            where: {
                id,
            },
        });
        revalidatePath("/team");
        return [teamRole, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
