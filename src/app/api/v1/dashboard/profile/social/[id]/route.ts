import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {authentication} from "@/middleware/auth.middleware";
import {deleteSocial} from "@/service/dashboard/profile.service";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const allow = await allowedMiddleware(req, "@perfil");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await deleteSocial(params.id);
    return NextResponse.json(response.response, response.status);
}
