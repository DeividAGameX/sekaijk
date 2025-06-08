import {RespCommon} from "@/types/Resp";
import {UserTable} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function getAllUsers(): Promise<
    [UserTable[] | RespCommon, ResponseInit]
> {
    try {
        const users = await UsersModel.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                Roles: true,
                TeamRoles: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return [users, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
