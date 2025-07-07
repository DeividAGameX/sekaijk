import generatorImageApi from "@/features/generatorImage/service/generatorImage.service";
import {NextRequest} from "next/server";

type TemplateType = "template1" | "template2" | "template3";

export async function GET(req: NextRequest) {
    const template = req.nextUrl.searchParams.get("template") ?? "TEMPLATE1";
    const text1 = req.nextUrl.searchParams.get("text1");
    const text2 = req.nextUrl.searchParams.get("text2");
    const img1 = req.nextUrl.searchParams.get("img1");
    const img2 = req.nextUrl.searchParams.get("img2");
    return generatorImageApi((template as TemplateType) ?? "template1", {
        text1: text1 ?? "",
        text2: text2 ?? "",
        img1: img1 ?? "",
        img2: img2 ?? "",
    });
}
