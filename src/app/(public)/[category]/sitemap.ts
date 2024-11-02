import {prisma} from "@/lib/prisma";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const ids = await prisma.categories.findMany({
        select: {
            slug: true,
            createdAt: true,
        },
    });
    return ids.map((i) => ({
        url: `${process.env.BASE_URL}/${i.slug}`,
        priority: 0.8,
        lastModified: new Date(i.createdAt).toISOString(),
        params: {
            category: i.slug,
        },
    }));
}
