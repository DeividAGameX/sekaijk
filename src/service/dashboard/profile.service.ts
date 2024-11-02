import {prisma} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";

export async function getProfile(id: string): Promise<ReturnType> {
    try {
        const profile = await prisma.users.findUnique({
            where: {id: parseInt(id)},
            include: {
                Roles: true,
                social: true,
            },
        });
        return {
            response: profile,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getPost(id: string): Promise<ReturnType> {
    try {
        const posts = await prisma.posts.findMany({
            where: {
                authorId: parseInt(id),
            },
        });
        return {
            response: posts,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function editProfile(id: string, data: any): Promise<ReturnType> {
    try {
        const user = await prisma.users.update({
            where: {id: parseInt(id)},
            data,
        });
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function addSocial(id: string, data: any): Promise<ReturnType> {
    try {
        const social = await prisma.social.create({
            data: {
                ...data,
                userId: parseInt(id),
            },
        });
        return {
            response: social,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteSocial(id: string): Promise<ReturnType> {
    try {
        await prisma.social.delete({
            where: {id: parseInt(id)},
        });
        return {
            response: null,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}
