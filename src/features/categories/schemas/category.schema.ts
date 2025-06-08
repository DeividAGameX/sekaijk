import {z} from "zod";
import {CategoryForm} from "@/features/categories/types/category";
import {RespCommon} from "@/types/Resp";

const categorySchema = z.object({
    name: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    description: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(500, {message: "max500"}),
});

function categoryValidate(
    body: CategoryForm
): [
    (
        | CategoryForm
        | {[key: string]: string | {[key: string]: string}}
        | RespCommon
    ),
    ResponseInit
] {
    try {
        return [categorySchema.parse(body), {status: 0}];
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

export default categoryValidate;
