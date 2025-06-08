import {z} from "zod";

export const animeSchema = z.object({
    title: z.string().min(1, "title"),
    description: z.string().min(10, "min-description"),
    body: z.string().optional(),
    banner: z.string().url().optional(),
    episodes: z.number().min(0),
    slug: z.string().optional(),
    postStatus: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
    status: z.enum(["ONGOING", "COMPLETED", "CANCELLED"]),
});

export type AnimeSchema = z.infer<typeof animeSchema>;
