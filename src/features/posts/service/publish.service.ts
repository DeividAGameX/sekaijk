import {RespCommon} from "@/types/Resp";
import {Post, UpdatePost} from "@/features/posts/types/posts";
import PostModel from "@/features/posts/lib/PostModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import {compileHtmlToMarkdown} from "@/utils/HtmlToMarkdown";
import PostReviewModel from "../lib/PostReviewModel";
import slugify from "slugify";
import sendNotification from "@/features/notifications/utils/sendNotification";
import {NotificationType as NotificationEnum} from "@prisma/client";
import {revalidatePath} from "next/cache";

type UpdatePostWithReview = UpdatePost & {
    comment: string;
    editorId: number;
};

export async function validateTempPublish(idPost: number, idUser: number) {
    const lastReview = await PostReviewModel.findFirst({
        where: {
            active: true,
            postId: idPost,
            authorId: idUser,
            status: "APPROVED",
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    if (lastReview) {
        return false;
    }
    return true;
}

export default async function publishPost(
    id: number,
    body: UpdatePostWithReview
): Promise<[Post | RespCommon, ResponseInit]> {
    try {
        const {Tags, editorId, comment, ...data} = body;
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
                body: compileHtmlToMarkdown(body.body ?? ""),
                // body: data.body,
                status: "PUBLISHED",
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
        const publicPost = await PostModel.findFirst({
            where: {
                draftId: result.id,
            },
        });
        if (publicPost) {
            await PostModel.update({
                where: {
                    id: publicPost.id,
                },
                data: {
                    ...data,
                    body: compileHtmlToMarkdown(data.body ?? ""),
                    // body: data.body,
                    authorId: post.authorId,
                    draftId: result.id,
                    slug: slugify(data.title),
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
            const reValid = await PostModel.findUnique({
                select: {
                    slug: true,
                    Categories: {
                        select: {
                            slug: true,
                        },
                    },
                },
                where: {
                    id: publicPost.id,
                },
            });
            if (reValid) {
                revalidatePath(
                    `/${reValid.Categories?.slug}/${publicPost.slug}`
                );
            }
            revalidatePath("/");
        } else {
            const postC = await PostModel.create({
                data: {
                    ...data,
                    body: compileHtmlToMarkdown(data.body ?? ""),
                    // body: data.body,
                    authorId: post.authorId,
                    draftId: result.id,
                    status: "PUBLISHED",
                    slug: slugify(data.title),
                    Tags: {
                        connect: (Tags ?? []).map((i) => ({
                            id: typeof i === "object" ? i.id : i,
                        })),
                    },
                },
                include: {
                    Tags: true,
                },
            });
            const postN = await PostModel.findUnique({
                where: {
                    id: postC.id,
                },
                include: {
                    Categories: true,
                },
            });
            sendNotification({
                title: "Publicación publicada",
                message: `La publicación: ${postN?.title} ha sido publicada.`,
                type: NotificationEnum.POST_PUBLISHED,
                typeToSend: "ALL",
                targetUrl: `/${postN?.Categories?.slug}/${postN?.slug}`,
            });
            revalidatePath("/");
            if (postN)
                revalidatePath(`/${postN.Categories?.slug}/${postN.slug}`);
        }
        let lastReview = await PostReviewModel.findFirst({
            where: {
                active: true,
                postId: result.id,
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
                    active: false,
                    comment: comment,
                    reviewBody: post.body ?? "",
                    editorId: editorId,
                    status: "APPROVED",
                },
            });
        }
        return [result, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
