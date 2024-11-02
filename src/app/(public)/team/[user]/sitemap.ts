import {prisma} from "@/lib/prisma";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const ids = await prisma.users.findMany({
        select: {
            slug: true,
            createdAt: true,
        },
        where: {
            slug: {
                not: null,
            },
            isPublic: true,
        },
    });
    return ids.map((i) => ({
        url: `${process.env.BASE_URL}/team/${i.slug}`,
        priority: 0.8,
        lastModified: new Date(i.createdAt).toISOString(),
        params: {
            category: i.slug,
        },
    }));
}
