import {z} from "zod";
import {RoleForm} from "../types/roles";
import {RespCommon} from "@/types/Resp";

const roleSchema = z.object({
    name: z.string().min(1, "name"),
    description: z.string().min(1, "description"),
});

function roleValidate(
    body: RoleForm
): [
    RoleForm | {[key: string]: string | {[key: string]: string}} | RespCommon,
    ResponseInit
] {
    try {
        return [roleSchema.parse(body), {status: 0}];
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

export default roleValidate;
