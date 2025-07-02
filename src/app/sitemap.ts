import Categories from "@/features/categories/lib/CategoriesModel";
import TeamRoleModel from "@/features/teamRole/lib/TeamRoleModel";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_URL!;
    const now = new Date().toISOString();

    const siteMap: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: now,
            priority: 1,
            changeFrequency: "daily",
        },
        {
            url: `${baseUrl}/about_us`,
            lastModified: now,
            priority: 0.8,
            changeFrequency: "monthly",
        },
        {
            url: `${baseUrl}/team`,
            lastModified: now,
            priority: 0.7,
            changeFrequency: "monthly",
        },
    ];

    // Agregar miembros del equipo
    const teams = await TeamRoleModel.findMany({
        select: {
            Users: {
                select: {slug: true},
            },
        },
        where: {
            isSection: true,
        },
    });

    teams.forEach((team) => {
        team.Users?.forEach((user) => {
            if (user.slug) {
                siteMap.push({
                    url: `${baseUrl}/team/${user.slug}`,
                    lastModified: now,
                    priority: 0.6,
                    changeFrequency: "monthly",
                });
            }
        });
    });

    // Agregar categorías y publicaciones
    const categories = await Categories.findMany({
        select: {
            slug: true,
            updatedAt: true,
            posts: {
                select: {
                    slug: true,
                    updatedAt: true,
                },
                where: {
                    slug: {not: null},
                    draftId: {not: null},
                },
            },
        },
    });

    categories.forEach((category) => {
        siteMap.push({
            url: `${baseUrl}/${category.slug}`,
            lastModified: category.updatedAt.toISOString(),
            priority: 0.7,
            changeFrequency: "monthly",
        });

        category.posts.forEach((post) => {
            siteMap.push({
                url: `${baseUrl}/${category.slug}/${post.slug}`,
                lastModified: post.updatedAt.toISOString(),
                priority: 0.5,
                changeFrequency: "weekly",
            });
        });
    });

    return siteMap;
}
