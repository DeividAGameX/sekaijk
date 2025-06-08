import {z} from "zod";
import {CreatePost, UpdatePost} from "../types/posts";
import {RespCommon} from "@/types/Resp";

const createSchema = z.object({
    title: z.string().min(1, "title"),
    description: z.string().min(10, "description"),
});

const updateSchema = z.object({
    title: z.string().min(1, "title"),
    description: z.string().min(10, "description"),
    body: z.string().nullable().optional(),
    banner: z.string().url().nullable().optional(),
    status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
    categoryId: z.number().optional(),
});

export function validateCreate(
    body: CreatePost
): [
    CreatePost | {[key: string]: string | {[key: string]: string}} | RespCommon,
    ResponseInit
] {
    try {
        return [createSchema.parse(body), {status: 200}];
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

export function validateUpdate(
    body: UpdatePost
): [
    CreatePost | {[key: string]: string | {[key: string]: string}} | RespCommon,
    ResponseInit
] {
    try {
        return [updateSchema.parse(body), {status: 200}];
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
