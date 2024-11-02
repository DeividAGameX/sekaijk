import {NextRequest, NextResponse} from "next/server";
import {getTags, createTag} from "@/service/dashboard/tags.service";
import {allowedMiddleware} from "@/middleware/allowedMiddleware";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@tag");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const result = await getTags();
    return NextResponse.json(result.response, result.status);
}

export async function POST(request: NextRequest) {
    const allow = await allowedMiddleware(request, "@tag-create");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const data = await request.json();
    const result = await createTag(data);
    return NextResponse.json(result.response, result.status);
}
