import {z} from "zod";
import {TeamRoleForm} from "../types/teamRole";
import {RespCommon} from "@/types/Resp";

const tagSchema = z.object({
    name: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    isSection: z.boolean({message: "string"}).default(false),
});

function teamRoleValidate(
    body: TeamRoleForm
): [
    (
        | TeamRoleForm
        | {[key: string]: string | {[key: string]: string}}
        | RespCommon
    ),
    ResponseInit
] {
    try {
        return [tagSchema.parse(body), {status: 0}];
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

export default teamRoleValidate;
