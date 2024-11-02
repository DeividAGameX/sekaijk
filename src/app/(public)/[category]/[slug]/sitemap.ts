import {prisma} from "@/lib/prisma";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const ids = await prisma.posts.findMany({
        select: {
            slug: true,
            updatedAt: true,
            Categories: {
                select: {
                    slug: true,
                },
            },
        },
        where: {
            slug: {
                not: null,
            },
            draft: {
                not: null,
            },
        },
    });

    return ids.map((i) => ({
        url: `${process.env.BASE_URL}/${i.Categories?.slug}/${i.slug}`,
        priority: 0.8,
        lastModified: new Date(i.updatedAt).toISOString(),
        params: {
            category: i.Categories?.slug,
            slug: i.slug,
        },
    }));
}
