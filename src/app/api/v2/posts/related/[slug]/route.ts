import getRelated from "@/features/public/service/getRelated.service";
import {publicCategoriesParams} from "@/types/api/paramApi";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, {params}: publicCategoriesParams) {
    const {slug} = await params;
    const slugParam = req.nextUrl.searchParams.get("slugIgnore");
    let slugIgnore = undefined;
    if (slugParam) {
        slugIgnore = slugParam.split(",");
    }
    const response = await getRelated(slug, slugIgnore);
    return NextResponse.json(...response);
}
