import {prisma} from "@/lib/prisma";
import {getToken} from "next-auth/jwt";

export async function allowedMiddleware(
    req: any,
    allowed: string
): Promise<boolean> {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(token?.sub ?? "0"),
        },
        include: {
            Roles: {
                include: {
                    Permissions: true,
                },
            },
        },
    });
    const allow = user?.Roles.Permissions.find(
        (p) => p.permissions === allowed
    );
    if (allow) {
        return false;
    }
    return true;
}
