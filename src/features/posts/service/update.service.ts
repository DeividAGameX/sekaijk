import {RespCommon} from "@/types/Resp";
import {Post, UpdatePost} from "@/features/posts/types/posts";
import PostModel from "@/features/posts/lib/PostModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {compileHtmlToMarkdown} from "@/utils/HtmlToMarkdown";
import PostReviewModel from "../lib/PostReviewModel";

export default async function updatePost(
    id: number,
    body: UpdatePost
): Promise<[Post | RespCommon, ResponseInit]> {
    try {
        const {Tags, ...data} = body;
        const post = await PostModel.findUnique({
            where: {
                id,
            },
            include: {
                Tags: true,
            },
        });
        if (!post) {
            return [{message: "notFound"}, {status: 404}];
        }
        const oldTags = post.Tags.map((i) => ({id: i.id}));
        const result = await PostModel.update({
            where: {
                id,
            },
            data: {
                ...data,
                body: compileHtmlToMarkdown(data.body ?? ""),
                // body: data.body,
                Tags: {
                    disconnect: oldTags,
                    connect: (Tags ?? []).map((i) => ({
                        id: typeof i === "object" ? i.id : i,
                    })),
                },
            },
            include: {
                Tags: true,
            },
        });
        let lastReview = await PostReviewModel.findFirst({
            where: {
                active: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        if (lastReview) {
            lastReview = await PostReviewModel.update({
                where: {
                    id: lastReview.id,
                },
                data: {
                    reviewBody: data.body ?? "",
                },
            });
        }
        return [result, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
