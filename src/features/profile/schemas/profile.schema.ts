import {z} from "zod";
import {RespCommon} from "@/types/Resp";
import {ProfileForm} from "../types/profile";

const profileSchema = z.object({
    name: z.string().min(1, "user"),
    email: z.string().email("email"),
    avatar: z.string().url("invalid-avatar"),
    banner: z.string().optional().default(""),
    description: z.string().optional().default(""),
});

function profileValidate(
    body: ProfileForm
): [
    (
        | ProfileForm
        | {[key: string]: string | number | {[key: string]: string}}
        | RespCommon
    ),
    ResponseInit
] {
    try {
        return [profileSchema.parse(body), {status: 0}];
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

export default profileValidate;
