import {readFile} from "node:fs/promises";
import {join} from "node:path";
import satori from "satori";
import {initWasm, Resvg} from "@resvg/resvg-wasm";
import classifyTemplate from "../utils/classifyTemplate";
import {ImageProp, TemplateType} from "../types/ImageProps";

await initWasm(fetch("https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm"));

export default async function generatorImageApi(
    template: TemplateType,
    params: ImageProp
) {
    const interSemiBold = await readFile(
        join(process.cwd(), "public/fonts/BebasNeue-Regular.ttf")
    );
    const svg = await satori(
        classifyTemplate(template ?? "template1", params),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "BebasNeue",
                    style: "normal",
                    weight: 400,
                    data: interSemiBold,
                },
            ],
        }
    );
    const resvg = new Resvg(svg, {
        fitTo: {mode: "width", value: 1200},
    });
    const pngBuffer = resvg.render().asPng();
    return new Response(pngBuffer, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}
