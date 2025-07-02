import getLastUserPost from "@/features/public/service/getLastUser.service";
import {NextRequest, NextResponse} from "next/server";

interface Params {
    params: Promise<{userSlug: string}>;
}

export async function GET(req: NextRequest, {params}: Params) {
    const {userSlug} = await params;
    const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") ?? "10");
    const search = req.nextUrl.searchParams.get("search");
    const order = req.nextUrl.searchParams.get("order");
    const response = await getLastUserPost(
        userSlug,
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
