import {RespCommon} from "@/types/Resp";
import {Post} from "@/features/posts/types/posts";
import PostModel from "../lib/PostModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function deletePost(
    id: number
): Promise<[Post | RespCommon, ResponseInit]> {
    try {
        const publicPost = await PostModel.findFirst({
            where: {
                draftId: id,
            },
        });
        if (publicPost) {
            await PostModel.delete({
                where: {
                    id: publicPost.id,
                },
            });
        }
        const post = await PostModel.delete({
            where: {
                id,
            },
        });
        return [post, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
