import {RespCommon} from "@/types/Resp";
import {UserReturn} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function getUser(
    id: number
): Promise<[UserReturn | RespCommon, ResponseInit]> {
    try {
        const user = await UsersModel.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                rolesId: true,
                TeamRoles: true,
                createdAt: false,
                updatedAt: false,
            },
            where: {
                id,
            },
        });
        if (!user) {
            return [{message: "notFound"}, {status: 404}];
        }
        return [user, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
