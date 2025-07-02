import getLast from "@/features/public/service/getLast.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const slugParam = req.nextUrl.searchParams.get("slugIgnore");
    let slugIgnore = undefined;
    if (slugParam) {
        slugIgnore = slugParam.split(",");
    }
    const response = await getLast(slugIgnore);
    return NextResponse.json(...response);
}
