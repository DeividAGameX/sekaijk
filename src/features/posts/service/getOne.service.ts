import {RespCommon} from "@/types/Resp";
import {Post as PostType} from "../types/posts";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import PostModel from "../lib/PostModel";

export default async function getPost(
    id: number
): Promise<[PostType | RespCommon, ResponseInit]> {
    try {
        const post = await PostModel.findUnique({
            where: {
                id,
            },
        });
        if (!post) {
            return [{message: "Post not found"}, {status: 404}];
        }
        return [post, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
