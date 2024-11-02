import InfoAU from "@/components/public/AboutUs/Info";
import Team from "@/components/public/AboutUs/Team";
import WhatUs from "@/components/public/AboutUs/WhatUs";
import YtComponent from "@/components/public/AboutUs/YtComponent";
import {prisma} from "@/lib/prisma";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Divider} from "antd";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "SekAiJK | Sobre nosotros",
    description:
        "Bienvenido a nuestro increíble rincón digital! 🌟 Aquí, sumérgete en un universo donde el anime y los videojuegos se fusionan para brindarte la dosis perfecta de entretenimiento. 🎮🎬",
    keywords: [
        "SekaiJK",
        "videojuegos",
        "anime",
        "cultura geek",
        "canal de YouTube",
        "reseñas de videojuegos",
        "noticias de anime",
        "contenido geek",
        "cultura pop",
    ],
    openGraph: {
        title: "Sobre Nosotros | SekaiJK",
        description:
            "Bienvenido a nuestro increíble rincón digital! 🌟 Aquí, sumérgete en un universo donde el anime y los videojuegos se fusionan para brindarte la dosis perfecta de entretenimiento. 🎮🎬",
        url: "https://sekaijk.com/aboutUs",
        images: [
            {
                url: "https://sekaijk.com/",
                width: 800,
                height: 600,
                alt: "SekaiJK logo",
            },
        ],
    },
    twitter: {
        title: "Sobre Nosotros | SekaiJK",
        description:
            "Bienvenido a nuestro increíble rincón digital! 🌟 Aquí, sumérgete en un universo donde el anime y los videojuegos se fusionan para brindarte la dosis perfecta de entretenimiento. 🎮🎬",
        card: "summary_large_image",
        images: ["https://sekaijk.com/twitter-og-image.jpg"],
    },
};

async function About() {
    const team = await prisma.users.findMany({
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            name: true,
        },
        where: {
            isPublic: true,
        },
    });
    return (
        <>
            <div className="w-full h-screen bg-JK">
                <div className="bg-neutral-950/60 backdrop-blur-sm w-full h-full flex justify-center items-center">
                    <div className="max-w-7xl w-full mx-auto text-center">
                        <h3 className="text-lg text-neutral-300">
                            Bienvenido a
                        </h3>
                        <h1 className="text-6xl">SekAiJK</h1>
                        <Divider>
                            <h4 className="text-sm text-neutral-500">
                                Mas sobre nosotros
                            </h4>
                            <FontAwesomeIcon
                                className="text-sm text-neutral-500"
                                icon={faArrowDown}
                            />
                        </Divider>
                    </div>
                </div>
            </div>
            <InfoAU />
            <WhatUs />
            <Team team={team} />
            <YtComponent />
        </>
    );
}

export default About;
