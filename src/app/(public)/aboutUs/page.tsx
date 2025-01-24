import InfoAU from "./components/Info";
import WhatUs from "./components/Morejk";
import Team from "./components/Team";
import {prisma} from "@/lib/prisma";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Divider} from "antd";
import {Metadata} from "next";
import Image from "next/image";

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
            <div className="w-full p-10">
                <div className="max-w-7xl w-full mx-auto">
                    <div className="flex items-center flex-col gap-3">
                        <Image
                            src={"/assets/Perfil.jpg"}
                            alt={"Foto de perfil"}
                            className="w-80 h-80 rounded-full"
                            width={1080}
                            height={1080}
                        />
                        <h2 className="text-6xl font-bold text-[--primary]">
                            SekAiJK
                        </h2>
                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faYoutube} />}
                            href="https://www.youtube.com/@sekaijk"
                        >
                            Suscríbete
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
