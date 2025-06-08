import {z} from "zod";
import {TagForm} from "@/features/tags/types/tag";
import {RespCommon} from "@/types/Resp";

const tagSchema = z.object({
    name: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    color: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {message: "invalidColor"}),
    description: z
        .string({message: "string"})
        .min(1, "require")
        .max(500, {message: "max500"}),
});

function tagValidate(
    body: TagForm
): [
    TagForm | {[key: string]: string | {[key: string]: string}} | RespCommon,
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

export default tagValidate;
