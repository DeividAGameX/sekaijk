import {prisma} from "@/lib/prisma";
import {ReturnType} from "@/types/api/response";
import {validateError} from "@/utils/ServerError";

export async function getRoles(): Promise<ReturnType> {
    try {
        const roles = await prisma.roles.findMany({
            orderBy: {
                id: "asc",
            },
            include: {
                Permissions: true,
            },
        });
        return {
            response: roles,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function getRoleById(id: string): Promise<ReturnType> {
    try {
        const role = await prisma.roles.findUnique({
            where: {id: parseInt(id)},
            include: {
                Permissions: true,
            },
        });
        return {
            response: role,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function createRole(data: any): Promise<ReturnType> {
    try {
        const role = await prisma.roles.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        if (data.Permissions) {
            await prisma.permissions.createMany({
                data: data.Permissions.map((permission: any) => ({
                    roleId: role.id,
                    ...permission,
                })),
            });
        }
        return {
            response: role,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function updateRole(id: string, data: any): Promise<ReturnType> {
    try {
        await prisma.permissions.deleteMany({
            where: {roleId: parseInt(id)},
        });
        const role = await prisma.roles.update({
            where: {id: parseInt(id)},
            data: {
                name: data.name,
            },
        });
        if (data.Permissions) {
            await prisma.permissions.createMany({
                data: data.Permissions.map((permission: any) => ({
                    roleId: role.id,
                    ...permission,
                })),
            });
        }
        return {
            response: role,
            status: {status: 200},
        };
    } catch (error) {
        return validateError(error);
    }
}

export async function deleteRole(id: string): Promise<ReturnType> {
    try {
        await prisma.roles.delete({
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
