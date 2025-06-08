import {z} from "zod";
import {UserForm} from "../types/user";
import {RespCommon} from "@/types/Resp";

const userSchema = z.object({
    name: z.string().min(1, "user"),
    email: z.string().email("email"),
    password: z.string().min(4, "min-password"),
    avatar: z.string().url("invalid-avatar"),
    rolesId: z.number(),
});

function userValidate(
    body: UserForm
): [
    (
        | UserForm
        | {[key: string]: string | number | {[key: string]: string}}
        | RespCommon
    ),
    ResponseInit
] {
    try {
        return [userSchema.parse(body), {status: 0}];
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: {[key: string]: string} = {};
            console.log(error.issues);
            for (const f of error.issues) {
                fieldErrors[f.path[0]] = f.message;
            }
            return [
                {message: "formInvalid", field: fieldErrors},
                {status: 400},
            ];
        }
        return [
            {
                message: "unknown",
            },
            {status: 400},
        ];
    }
}

export default userValidate;
