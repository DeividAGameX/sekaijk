import {RespCommon} from "@/types/Resp";
import {CreatePost, Post} from "@/features/posts/types/posts";
import PostModel from "@/features/posts/lib/PostModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";

export default async function createPost(
    body: CreatePost,
    author: number
): Promise<[Post | RespCommon, ResponseInit]> {
    try {
        const result = await PostModel.create({
            data: {...body, authorId: author, slug: null},
        });
        return [result, {status: 200}];
    } catch (error) {
        console.log(error);
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
