import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {authentication} from "@/middleware/auth.middleware";
import {publishPost} from "@/service/dashboard/posts.service";
import {NextRequest, NextResponse} from "next/server";

export async function PUT(
    req: NextRequest,
    {params, query}: {params: {id: string}; query: any}
) {
    const allow = await allowedMiddleware(req, "@post-edit");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    console.log(query);
    const response = await publishPost(
        params.id,
        await req.json(),
        authenticate.response
    );
    return NextResponse.json(response.response, response.status);
}
