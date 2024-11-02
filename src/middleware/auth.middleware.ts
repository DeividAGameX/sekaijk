import {prisma} from "@/lib/prisma";
import {getToken} from "next-auth/jwt";
import {NextRequest} from "next/server";

export async function authentication(
    req: NextRequest
): Promise<{error: any; response?: any; status?: any}> {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
        return {
            error: true,
            response: {message: "api.error.access_token"},
            status: {status: 401},
        };
    }
    const user = await prisma.users.findUnique({
        where: {
            id: parseInt(token.sub ?? "0"),
        },
    });
    if (!user) {
        return {
            error: true,
            response: {message: "api.error.user_not_found"},
            status: {status: 401},
        };
    }
    return {error: false, response: token};
}
