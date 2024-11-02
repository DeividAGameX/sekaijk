import {prisma} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";

export async function getTags(): Promise<ReturnType> {
    try {
        const tags = await prisma.tags.findMany({
            orderBy: {
                id: "asc",
            },
        });
        return {
            response: tags,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getTagById(id: string): Promise<ReturnType> {
    try {
        const tag = await prisma.tags.findUnique({
            where: {id: parseInt(id)},
        });
        return {
            response: tag,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function createTag(data: any): Promise<ReturnType> {
    try {
        const tag = await prisma.tags.create({
            data,
        });
        return {
            response: tag,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function updateTag(id: string, data: any): Promise<ReturnType> {
    try {
        const tag = await prisma.tags.update({
            where: {id: parseInt(id)},
            data,
        });
        return {
            response: tag,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteTag(id: string): Promise<ReturnType> {
    try {
        const tag = await prisma.tags.delete({
            where: {id: parseInt(id)},
        });
        return {
            response: tag,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}
