import {Prisma} from "@prisma/client";
import * as yup from "yup";
import {getPrismaErrorMessage} from "./getErrorPrisma";
import {ReturnErrorType} from "@/types/api/errorResponse";

export function validateError(error: any): ReturnErrorType {
    console.log(error);
    if (error instanceof yup.ValidationError) {
        // Retrieve the first validation error and its associated form field
        const errField = error?.params?.path || ("" as string);
        const errMess = error.errors[0];

        return {
            response: {
                field: errField,
                message: errMess,
            },
            status: {status: 400},
        };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
            response: {
                message: getPrismaErrorMessage(error.code),
            },
            status: {status: 409},
        };
    }
    return {
        response: {
            message: "error",
        },
        status: {status: 500},
    };
}
