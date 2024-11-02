import {prisma as PrismaClient} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";
import {revalidatePath} from "next/cache";
import slugify from "slugify";
import bcrypt from "bcrypt";

const prisma = PrismaClient.$extends({
    query: {
        users: {
            create({args, query}) {
                if (args.data.name) {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }
                return query(args);
            },
            update({args, query}) {
                if (args.data.name && typeof args.data.name === "string") {
                    args.data.slug = slugify(args.data.name, {
                        lower: true,
                        strict: true,
                    });
                }

                return query(args);
            },
        },
    },
});

export async function getUsers(): Promise<ReturnType> {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                Roles: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        });
        return {
            response: users,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getUserById(id: string): Promise<ReturnType> {
    try {
        const user = await prisma.users.findUnique({
            where: {id: parseInt(id)},
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                rolesId: true,
            },
        });
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function createUser(data: any): Promise<ReturnType> {
    try {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        const user = await prisma.users.create({
            data,
        });
        if (user.isPublic) {
            revalidatePath(`/`);
            revalidatePath(`/team`);
            revalidatePath(`/team/${user.slug}`);
        }
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function updateUser(id: string, data: any): Promise<ReturnType> {
    try {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        const user = await prisma.users.update({
            where: {id: parseInt(id)},
            data,
        });
        if (user.isPublic) {
            revalidatePath(`/`);
            revalidatePath(`/team`);
            revalidatePath(`/team/${user.slug}`);
        }
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteUser(id: string): Promise<ReturnType> {
    try {
        const user = await prisma.users.delete({
            where: {id: parseInt(id)},
        });
        return {
            response: user,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export const getImg = async (id: string): Promise<ReturnType> => {
    try {
        const result = await prisma.usersResources.findMany({
            where: {
                userId: parseInt(id),
            },
        });
        return {
            response: {
                message: "success",
                image: result,
            },
            status: {status: 201},
        };
    } catch (error) {
        return validateError(error);
    }
};

export const addImg = async (id: string, body: any): Promise<ReturnType> => {
    try {
        const result = await prisma.usersResources.create({
            data: {
                userId: parseInt(id),
                ...body,
            },
        });
        return {
            response: {
                message: "success",
                id: result,
            },
            status: {status: 201},
        };
    } catch (error) {
        return validateError(error);
    }
};
