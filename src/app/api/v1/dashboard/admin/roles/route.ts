import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {createRole, getRoles} from "@/service/dashboard/admin/roles.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@roles");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getRoles();
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@roles-create");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await createRole(await req.json());
    return NextResponse.json(response.response, response.status);
}
