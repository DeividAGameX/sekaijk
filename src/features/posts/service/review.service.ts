import {RespCommon} from "@/types/Resp";
import {Post, PostReview, PostReviewState, UpdatePost} from "../types/posts";
import PostModel from "../lib/PostModel";
import {compileHtmlToMarkdown} from "@/utils/HtmlToMarkdown";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import PostReviewModel from "../lib/PostReviewModel";
import sendNotification from "@/features/notifications/utils/sendNotification";
import {NotificationType as NotificationEnum} from "@prisma/client";

export async function getReview(
    id: number
): Promise<[PostReview[] | RespCommon, ResponseInit]> {
    try {
        const review = await PostReviewModel.findMany({
            where: {
                postId: id,
                status: {
                    not: "PENDING",
                },
            },
            include: {
                editor: {
                    select: {
                        name: true,
                        avatar: true,
                    },
                },
            },
        });
        if (!review) {
            return [{message: "notFound"}, {status: 404}];
        }
        return [review, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}

export async function createReview(
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
                status: "REVIEW",
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
        const lastReview = await PostReviewModel.findFirst({
            where: {
                active: true,
            },
        });
        if (lastReview) {
            if (lastReview.status == "PENDING") {
                await PostReviewModel.update({
                    where: {
                        id: lastReview.id,
                    },
                    data: {
                        reviewBody: data.body ?? "",
                    },
                });
            } else {
                await PostReviewModel.update({
                    where: {
                        id: lastReview.id,
                    },
                    data: {
                        active: false,
                    },
                });
                await PostReviewModel.create({
                    data: {
                        postId: id,
                        reviewBody: data.body ?? "",
                        status: "PENDING",
                        authorId: post.authorId,
                    },
                });
                sendNotification({
                    title: "Solicitud de revisión para una publicación",
                    message: `Se solicita una revisión para la publicación: ${post.title}.`,
                    type: NotificationEnum.POST_REVIEW,
                    typeToSend: "PERMISSION",
                    permission: "@post-review",
                    targetUrl: `/dashboard/posts/${id}/review`,
                });
            }
        } else {
            await PostReviewModel.create({
                data: {
                    postId: id,
                    reviewBody: data.body ?? "",
                    status: "PENDING",
                    authorId: post.authorId,
                },
            });
            sendNotification({
                title: "Solicitud de revisión para una publicación",
                message: `Se solicita una revisión para la publicación: ${post.title}.`,
                type: NotificationEnum.POST_REVIEW,
                typeToSend: "PERMISSION",
                permission: "@post-review",
                targetUrl: `/dashboard/posts/${id}/review`,
            });
        }
        return [result, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}

export async function changeStateReview(
    id: string,
    body: PostReviewState
): Promise<[PostReview | RespCommon, ResponseInit]> {
    try {
        let review = await PostReviewModel.findUnique({
            where: {
                id,
            },
        });
        if (!review) {
            return [{message: "notFound"}, {status: 404}];
        }
        review = await PostReviewModel.update({
            where: {
                id,
            },
            include: {
                Posts: true,
            },
            data: body,
        });
        if (review.status == "APPROVED") {
            sendNotification({
                title: "Revisión aprobada para una publicación",
                message: `La revisión de la publicación: {postName} ha sido aprobada.`,
                type: NotificationEnum.POST_PUBLISHED,
                typeToSend: "POST",
                id: review.postId,
                targetUrl: `/dashboard/posts/${review.postId}`,
            });
        }
        if (review.status === "REJECTED") {
            sendNotification({
                title: "Revisión rechazada para una publicación",
                message: `La revisión de la publicación: {postName} ha sido rechazada.`,
                type: NotificationEnum.POST_REVIEW_CHANGED,
                typeToSend: "POST",
                id: review.postId,
                targetUrl: `/dashboard/posts/${review.postId}/review`,
            });
        }
        return [review, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
