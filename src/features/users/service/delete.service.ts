import {RespCommon} from "@/types/Resp";
import {User} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function deleteUser(
    id: number
): Promise<[User | RespCommon, ResponseInit]> {
    try {
        const user = await UsersModel.delete({
            where: {
                id,
            },
        });
        return [user, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
