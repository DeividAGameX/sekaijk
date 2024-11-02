import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {createUser, getUsers} from "@/service/dashboard/admin/users.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@users");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getUsers();
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@users-create");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await createUser(await req.json());
    return NextResponse.json(response.response, response.status);
}
