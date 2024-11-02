import {NextResponse} from "next/server";
import {
    getTagById,
    updateTag,
    deleteTag,
} from "@/service/dashboard/tags.service";
import {allowedMiddleware} from "@/middleware/allowedMiddleware";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(request, "@tag");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    try {
        const result = await getTagById(params.id);
        return NextResponse.json(result.response, result.status);
    } catch (error) {
        return NextResponse.json(
            {error: "Error al obtener el tag"},
            {status: 500}
        );
    }
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
    try {
        const allow = await allowedMiddleware(request, "@tag-edit");
        if (allow) {
            return NextResponse.json({message: "allowed"}, {status: 403});
        }
        const data = await request.json();
        const result = await updateTag(params.id, data);
        return NextResponse.json(result.response, result.status);
    } catch (error) {
        return NextResponse.json(
            {error: "Error al actualizar el tag"},
            {status: 500}
        );
    }
}

export async function DELETE(
    request: Request,
    {params}: {params: {id: string}}
) {
    try {
        const allow = await allowedMiddleware(request, "@tag-delete");
        if (allow) {
            return NextResponse.json({message: "allowed"}, {status: 403});
        }
        const result = await deleteTag(params.id);
        return NextResponse.json(result.response, result.status);
    } catch (error) {
        return NextResponse.json(
            {error: "Error al eliminar el tag"},
            {status: 500}
        );
    }
}
