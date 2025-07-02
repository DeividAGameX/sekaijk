import {RespCommon} from "@/types/Resp";
import {User} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {revalidatePath} from "next/cache";

export default async function deleteUser(
    id: number
): Promise<[User | RespCommon, ResponseInit]> {
    try {
        const user = await UsersModel.delete({
            where: {
                id,
            },
        });
        revalidatePath(`/team/${user.slug}`);
        revalidatePath("/team");
        return [user, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
