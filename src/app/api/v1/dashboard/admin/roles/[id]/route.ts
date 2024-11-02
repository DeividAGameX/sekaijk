import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {
    deleteRole,
    getRoleById,
    updateRole,
} from "@/service/dashboard/admin/roles.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@roles");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getRoleById(params.id);
    return NextResponse.json(response.response, response.status);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@roles-edit");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await updateRole(params.id, await req.json());
    return NextResponse.json(response.response, response.status);
}

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const allow = await allowedMiddleware(req, "@roles-delete");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await deleteRole(params.id);
    return NextResponse.json(response.response, response.status);
}
