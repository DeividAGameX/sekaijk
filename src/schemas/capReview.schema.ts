import {z} from "zod";

export const capReviewSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(10),
    banner: z.string().url().optional(),
    body: z.string().min(1),
    slug: z.string().optional(),
    status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
});

export type CapReviewSchema = z.infer<typeof capReviewSchema>;
