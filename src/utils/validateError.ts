import {Prisma} from "@prisma/client";
import {getPrismaErrorMessage} from "./errorsPrisma";
import {RespCommon} from "@/types/Resp";

export function validateErrorPrisma(
    error: Prisma.PrismaClientKnownRequestError
): [RespCommon, ResponseInit] {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return [
            {
                message: getPrismaErrorMessage(error.code),
            },
            {status: 409},
        ];
    }
    return [{message: "error"}, {status: 500}];
}
