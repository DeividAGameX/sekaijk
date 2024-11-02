import {allowedMiddleware} from "@/middleware/allowedMiddleware";
import {
    createCategory,
    getCategories,
} from "@/service/dashboard/categories.service";
import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@categories");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await getCategories();
    return NextResponse.json(response.response, response.status);
}

export async function POST(req: NextRequest) {
    const allow = await allowedMiddleware(req, "@categories-create");
    if (allow) {
        return NextResponse.json({message: "allowed"}, {status: 403});
    }
    const response = await createCategory(await req.json());
    return NextResponse.json(response.response, response.status);
}
