import {RespCommon} from "@/types/Resp";
import {User, UserForm} from "../types/user";
import UsersModel from "../lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import bcrypt from "bcrypt";

export default async function createUser(
    body: UserForm
): Promise<[User | RespCommon, ResponseInit]> {
    try {
        const {TeamRoles, ...data} = body;
        const password = await bcrypt.hash(data.password, 12);
        const user = await UsersModel.create({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                rolesId: true,
                createdAt: true,
                updatedAt: true,
            },
            data: {
                ...data,
                password: password,
                TeamRoles: {
                    connect: TeamRoles?.map((i) => ({id: i})),
                },
            },
        });
        return [user, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
