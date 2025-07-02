import getAllPost from "@/features/public/Categories/service/getPostFormCategory.service";
import {publicCategoriesParams} from "@/types/api/paramApi";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: publicCategoriesParams) {
    const {slug} = await params;
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10");
    const search = req.nextUrl.searchParams.get("search");
    const order = req.nextUrl.searchParams.get("order");
    const response = await getAllPost(
        slug,
        page,
        limit,
        search,
        order
            ? {
                  [order.split(":")[0]]: order.split(":")[1],
              }
            : {
                  createdAt: "desc",
              }
    );
    return NextResponse.json(...response);
}
