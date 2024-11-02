import {getPostByCategory} from "@/service/public/categories.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
    req: NextRequest,
    {params}: {params: {slug: string}}
) {
    const response = await getPostByCategory(
        params.slug,
        parseInt(req.nextUrl.searchParams.get("page") || "0"),
        req.nextUrl.searchParams.get("search") || ""
    );
    return NextResponse.json(response.response, response.status);
}
