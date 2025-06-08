import {RespCommon} from "@/types/Resp";
import {User, UserForm} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import bcrypt from "bcrypt";

export default async function editUser(
    id: number,
    body: UserForm
): Promise<[User | RespCommon, ResponseInit]> {
    try {
        const {TeamRoles, ...data} = body;
        const userOld = await UsersModel.findUnique({
            where: {
                id,
            },
            include: {
                TeamRoles: true,
            },
        });
        if (!userOld) {
            return [{message: "notFound"}, {status: 404}];
        }
        const oldTeams = userOld.TeamRoles.map((i) => ({id: i.id}));
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        const user = await UsersModel.update({
            where: {
                id,
            },
            data: {
                ...data,
                TeamRoles: {
                    disconnect: oldTeams,
                    connect: TeamRoles?.map((i) => ({id: i})),
                },
            },
        });
        return [user, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
