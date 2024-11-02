import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {
    deleteUser,
    getUserById,
    updateUser,
} from "@/service/dashboard/admin/users.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@users");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getUserById(params.id);
    return NextResponse.json(response.response, response.status);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@users-edit");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await updateUser(params.id, await req.json());
    return NextResponse.json(response.response, response.status);
}

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const allow = await allowedMiddleware(req, "@users-delete");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await deleteUser(params.id);
    return NextResponse.json(response.response, response.status);
}
