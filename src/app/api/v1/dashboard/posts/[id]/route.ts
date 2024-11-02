import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {deletePost, getPostById} from "@/service/dashboard/posts.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const allow = await allowedMiddleware(req, "@post");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getPostById(params.id);
    return NextResponse.json(response.response, response.status);
}

export async function DELETE(
    req: NextRequest,
    {params}: {params: {id: string}}
) {
    const allow = await allowedMiddleware(req, "@post-delete");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await deletePost(params.id);
    return NextResponse.json(response.response, response.status);
}
