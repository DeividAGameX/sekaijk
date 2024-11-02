import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {authentication} from "@/middleware/auth.middleware";
import {editProfile, getProfile} from "@/service/dashboard/profile.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@perfil");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await getProfile(authenticate.response.sub);
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@perfil");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await editProfile(
        authenticate.response.sub,
        await req.json()
    );
    return NextResponse.json(response.response, response.status);
}
