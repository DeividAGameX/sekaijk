import UsersModel from "@/features/users/lib/UsersModel";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {Profile} from "../types/profile";

export default async function getProfile(
    id: number
): Promise<[Profile | RespCommon, ResponseInit]> {
    try {
        const user = await UsersModel.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                banner: true,
                description: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                TeamRoles: true,
                Roles: true,
                social: true,
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
