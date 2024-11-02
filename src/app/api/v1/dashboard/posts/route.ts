import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {authentication} from "@/middleware/auth.middleware";
import {createPost, getPosts} from "@/service/dashboard/posts.service";
import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@post");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getPosts(
        parseInt(req.nextUrl.searchParams.get("page") || "0"),
        parseInt(req.nextUrl.searchParams.get("limit") || "10"),
        req.nextUrl.searchParams.get("Search") || "",
        req.nextUrl.searchParams.get("categories")
            ? req.nextUrl.searchParams.get("categories")?.split(",")
            : [],
        req.nextUrl.searchParams.get("sort")
            ? req.nextUrl.searchParams.get("sort")?.split(",")
            : ["createdAt", "asc"]
    );
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@post-create");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const authenticate = await authentication(req);
    if (authenticate.error) {
        return NextResponse.json(authenticate.response, authenticate.status);
    }
    const response = await createPost(await req.json(), authenticate.response);
    return NextResponse.json(response.response, response.status);
}
