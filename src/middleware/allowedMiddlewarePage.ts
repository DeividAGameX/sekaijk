import {getToken} from "next-auth/jwt";

export async function allowedMiddleware(
    req: any,
): Promise<boolean> {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(token);
    const allow = true;
    if (allow) {
        return false;
    }
    return true;
}
