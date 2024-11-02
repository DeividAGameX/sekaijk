import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {savePost} from "@/service/dashboard/posts.service";
import {NextRequest, NextResponse} from "next/server";

export const PUT = async (
    req: NextRequest,
    {params}: {params: {id: string}}
) => {
    const allow = await allowedMiddleware(req, "@post-edit");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await savePost(params.id, await req.json());
    return NextResponse.json(response.response, response.status);
};
