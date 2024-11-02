import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {
    deleteCategory,
    getCategoryById,
    updateCategory,
} from "@/service/dashboard/categories.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@categories");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getCategoryById(params.id);
    return NextResponse.json(response.response, response.status);
}

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@categories-edit");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await updateCategory(params.id, await req.json());
    return NextResponse.json(response.response, response.status);
}

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const allow = await allowedMiddleware(req, "@categories-delete");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await deleteCategory(params.id);
    return NextResponse.json(response.response, response.status);
}
