import {getPostByUser} from "@/service/public/team.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
    req: NextRequest,
    {params}: {params: {idTeam: string}}
) {
    const response = await getPostByUser(
        params.idTeam,
        parseInt(req.nextUrl.searchParams.get("page") || "0"),
        req.nextUrl.searchParams.get("search") || ""
    );
    return NextResponse.json(response.response, response.status);
}
