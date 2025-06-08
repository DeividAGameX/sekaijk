import {RespCommon} from "@/types/Resp";
import {Profile, ProfileForm} from "../types/profile";
import UsersModel from "@/features/users/lib/UsersModel";
import {validateErrorPrisma} from "@/utils/validateError";
import {Prisma} from "@prisma/client";
import SocialModel from "../lib/SocialModel";
import {compileHtmlToMarkdown} from "@/utils/HtmlToMarkdown";

export default async function updateProfile(
    id: number,
    body: ProfileForm
): Promise<[Profile | RespCommon, ResponseInit]> {
    try {
        const {social, ...data} = body;
        const userOld = await UsersModel.findUnique({
            where: {
                id,
            },
            include: {
                TeamRoles: true,
            },
        });
        if (!userOld) {
            return [{message: "notFound"}, {status: 404}];
        }
        await SocialModel.deleteMany({
            where: {
                userId: id,
            },
        });
        await SocialModel.createMany({
            data: social.map((s) => ({
                userId: id,
                url: s.url,
                icon: s.icon,
            })),
        });
        const user = await UsersModel.update({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                banner: true,
                description: true,
                slug: true,
                createdAt: true,
                updatedAt: true,
                TeamRoles: true,
                Roles: true,
                social: true,
            },
            where: {
                id,
            },
            data: {
                ...data,
                description: compileHtmlToMarkdown(data.description ?? ""),
            },
        });
        return [user, {status: 200}];
    } catch (error) {
        return validateErrorPrisma(
            error as Prisma.PrismaClientKnownRequestError
        );
    }
}
