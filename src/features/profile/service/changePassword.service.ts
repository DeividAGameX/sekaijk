import UsersModel from "@/features/users/lib/UsersModel";
import {RespCommon} from "@/types/Resp";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import bcrypt from "bcrypt";

interface PasswordChange {
    currentPassword: string;
    newPassword: string;
}

export default async function changePassword(
    id: number,
    body: PasswordChange
): Promise<[RespCommon, ResponseInit]> {
    try {
        const userData = await UsersModel.findUnique({
            where: {
                id,
            },
        });
        if (!userData) {
            return [{message: "notFound"}, {status: 404}];
        }
        const valid = await bcrypt.compare(
            body.currentPassword,
            userData.password
        );
        if (!valid) {
            return [{message: "passwordMismatch"}, {status: 403}];
        }
        const password = await bcrypt.hash(body.newPassword, 12);
        await UsersModel.update({
            where: {
                id,
            },
            data: {
                password: password,
            },
        });
        return [{message: "change"}, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
