import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {authentication} from "@/middleware/auth.middleware";
import {addImg, getImg} from "@/service/dashboard/admin/users.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@user-resource");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await getImg(authenticate.response.sub);
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@user-resource");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await addImg(authenticate.response.sub, await req.json());
    return NextResponse.json(response.response, response.status);
}
