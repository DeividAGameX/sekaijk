import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: "/dashboard",
            },
            {
                userAgent: "*",
                allow: "/",
                disallow: "/preview",
            },
        ],
    };
}
