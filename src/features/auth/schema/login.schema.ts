import {z} from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "user"),
    password: z.string().min(4, "min-password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
