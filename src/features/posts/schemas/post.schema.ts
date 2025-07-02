import {z} from "zod";
import {CreatePost, UpdatePost} from "../types/posts";
import {RespCommon} from "@/types/Resp";

const createSchema = z.object({
    title: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    description: z
        .string({message: "string"})
        .min(1, "require")
        .max(500, {message: "max500"}),
});

const updateSchema = z.object({
    title: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    description: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(500, {message: "max500"}),
    body: z.string({message: "string"}).nullable().optional(),
    banner: z.string().url().nullable().optional(),
    status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
    categoryId: z.number().optional().nullable(),
});

const publishSchema = z.object({
    title: z
        .string({message: "string"})
        .min(1, {message: "require"})
        .max(150, {message: "max150"}),
    description: z
        .string({message: "string"})
        .min(1, "require")
        .max(500, {message: "max500"}),
    body: z.string({message: "string"}).min(1, {message: "require"}),
    banner: z.string({message: "img"}).url({message: "img-invalid"}),
    categoryId: z.number({message: "category"}),
    Tags: z
        .array(z.number({message: "number-array"}), {message: "tags"})
        .min(1, {message: "require"}),
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

export function validatePublish(
    body: UpdatePost
): [
    CreatePost | {[key: string]: string | {[key: string]: string}} | RespCommon,
    ResponseInit
] {
    try {
        return [publishSchema.parse(body), {status: 200}];
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
