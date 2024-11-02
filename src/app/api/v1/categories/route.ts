import {getCategories} from "@/service/public/categories.service";
import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const response = await getCategories();
    return NextResponse.json(response.response, response.status);
}
