import HomeCarousel from "@/components/public/Home/Carousel";
import DeInteres from "@/components/public/Home/DeInteres";
import NewsPost from "@/components/public/Home/News";
import RecentPost from "@/components/public/Home/RecentPost";
import YTAbout from "@/components/public/Home/YTAbout";
import {prisma} from "@/lib/prisma";
import {Metadata} from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
    description:
        "Somos fanáticos del anime, videojuegos y amantes de la cultura geek. En el 2022 iniciamos nuestro viaje para ofrecer una explosión de contenido creativo y entretenido, lleno de referencias, humor y monas chinas. Entonces, ¿buscas un canal sobre anime y videojuegos? Pues acompáñanos, porque con nuestras voces encantadoras y nuestro carisma desbordante, te prometemos una experiencia llena de diversión y aventuras.",
    keywords:
        "anime, videojuegos, cultura geek, entretenimiento, humor, monas chinas, SekAiJK",
    openGraph: {
        title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
        description:
            "Somos fanáticos del anime, videojuegos y amantes de la cultura geek. En el 2022 iniciamos nuestro viaje para ofrecer una explosión de contenido creativo y entretenido, lleno de referencias, humor y monas chinas. Entonces, ¿buscas un canal sobre anime y videojuegos? Pues acompáñanos, porque con nuestras voces encantadoras y nuestro carisma desbordante, te prometemos una experiencia llena de diversión y aventuras.",
        url: "https://sekaijk.com",
        type: "website",
        siteName: "SekAiJK",
        images: [
            {
                url: "https://res.cloudinary.com/sekai-jk/image/upload/v1715476651/Sekaijk/Perfil_qb9rvf.jpg",
                alt: "SekAiJK",
            },
        ],
    },
};

export default async function Home() {
    const carousel = await prisma.posts.findMany({
        select: {
            title: true,
            banner: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    slug: true,
                    name: true,
                    avatar: true,
                },
            },
            Categories: true,
            Tags: true,
        },
        where: {
            slug: {
                not: null,
            },
            draft: {
                not: null,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });
    const news = await prisma.posts.findMany({
        select: {
            title: true,
            banner: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    slug: true,
                    name: true,
                    avatar: true,
                },
            },
            Categories: true,
            Tags: true,
        },
        where: {
            slug: {
                not: null,
            },
            draft: {
                not: null,
            },
            categoryId: 2,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 6,
    });
    const reviews = await prisma.posts.findMany({
        select: {
            title: true,
            banner: true,
            description: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    slug: true,
                    name: true,
                    avatar: true,
                },
            },
            Categories: true,
            Tags: true,
        },
        where: {
            slug: {
                not: null,
            },
            draft: {
                not: null,
            },
            categoryId: 1,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 4,
    });
    const deInteres = await prisma.posts.findMany({
        select: {
            title: true,
            banner: true,
            description: true,
            slug: true,
            createdAt: true,
            author: {
                select: {
                    slug: true,
                    name: true,
                    avatar: true,
                },
            },
            Categories: true,
            Tags: true,
        },
        where: {
            slug: {
                not: null,
            },
            draft: {
                not: null,
            },
            categoryId: 3,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
    const yt = await prisma.ytVideos.findMany({
        where: {
            type_video: 1,
        },
    });
    return (
        <>
            <HomeCarousel items={carousel} />
            <NewsPost news={news} />
            <RecentPost reviews={reviews} />
            <DeInteres interes={deInteres} />
            <YTAbout data={yt} />
        </>
    );
}
