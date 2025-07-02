import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sobre Nosotros | SekAiJK",
    description:
        "SekAiJK es tu rincón digital donde el anime, los videojuegos y la cultura geek se fusionan para ofrecerte contenido único, reseñas, noticias y más.",
    keywords: [
        "SekAiJK",
        "videojuegos",
        "anime",
        "cultura geek",
        "canal de YouTube",
        "reseñas de videojuegos",
        "noticias de anime",
        "contenido geek",
        "cultura pop",
    ],
    robots: "index, follow",
    alternates: {
        canonical: "https://sekaijk.com/aboutUs",
    },
    openGraph: {
        title: "Sobre Nosotros | SekAiJK",
        description:
            "Conoce el corazón de SekAiJK: un espacio para fans del anime, videojuegos y cultura pop. Reseñas, noticias y contenido geek hecho con pasión.",
        url: "https://sekaijk.com/aboutUs",
        siteName: "SekAiJK",
        type: "website",
        locale: "es_GT",
        images: [
            {
                url: "https://sekaijk.com/assets/og-aboutus.jpg",
                width: 1200,
                height: 630,
                alt: "Banner de SekAiJK con temática geek",
            },
        ],
    },
    twitter: {
        title: "Sobre Nosotros | SekAiJK",
        description:
            "Descubre el mundo de SekAiJK: contenido geek, anime, videojuegos y más en nuestro canal y blog.",
        card: "summary_large_image",
        images: ["https://sekaijk.com/assets/og-aboutus.jpg"],
    },
};

function AboutUs() {
    return (
        <div className="container">
            <article className="w-full">
                <header className="relative rounded-xl overflow-hidden mt-16">
                    <Image
                        src="/assets/FondoPortada.jpg"
                        alt="SekAi JK"
                        width={1280}
                        height={720}
                        className="w-full h-auto min-h-[520px] max-h-[520px] object-cover"
                        priority
                    />
                    {/* <div className="absolute bottom-0 w-full bg-gradient-to-t from-black from-10% to-transparent px-6 py-4"> */}
                    <div className="absolute top-0 left-0 h-full w-full px-2 py-2">
                        <div className="w-full h-full flex flex-col justify-center items-center bg-neutral-900/70 backdrop-blur-xs rounded-xl">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold font-lato">
                                    Sobre SekAi JK
                                </h1>
                                <Separator className="my-2" />
                                <p className="text-neutral-300 text-center max-w-lg">
                                    Sumérgete en un universo donde el anime y
                                    los videojuegos se fusionan para brindarte
                                    la dosis perfecta de entretenimiento. 🎮🎬
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="my-6 flex flex-col justify-center items-center gap-4 py-2 px-4 rounded-xl overflow-hidden bg-neutral-900 xl:flex-row md:bg-transparent">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/assets/hikari/hikari-s.png"
                            alt="Hikari"
                            width={720}
                            height={720}
                            className="w-96 h-96 object-cover rounded-full"
                            priority
                        />
                    </div>
                    <div className="max-w-2xl flex justify-center items-center">
                        <div className="text-center py-2 px-4 rounded-xl overflow-hidden xl:-rotate-3 md:bg-neutral-900">
                            <h2 className="text-5xl font-bold font-lato text-center">
                                ¿Qué es SekAiJK?
                            </h2>
                            <Separator className="my-2" />
                            <p>
                                Bueno,{" "}
                                <span className="text-primary">SekAiJK</span> es
                                un proyecto nacido por la idea de crear un canal
                                de anime, videojuegos y todo lo relacionado con
                                el mundo Geek o Friki. Un lugar donde te puedas
                                sentir cómodo viendo nuestras payasadas y
                                leyendo nuestros post.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="my-6 flex flex-col-reverse justify-center items-center gap-4 py-2 px-4 rounded-xl overflow-hidden bg-neutral-900 xl:flex-row md:bg-transparent">
                    <div className="max-w-2xl flex justify-center items-center">
                        <div className="text-center py-2 px-4 rounded-xl overflow-hidden md:bg-neutral-900">
                            <h2 className="text-5xl font-bold font-lato text-center">
                                Que Significa SekAiJK
                            </h2>
                            <Separator className="my-2" />
                            <p>
                                El nombre de{" "}
                                <span className="text-primary">SekAiJK</span>{" "}
                                proviene de una historia antigua japonesa que
                                cuenta sobre un mundo antiguo llamado
                                セクア・アイジェイク (Sekua aijeiku), este mundo
                                pretende ser un mundo donde las personas pueden
                                tener momentos pacifico y dedicarse a sus jobis
                                sin necesidad de ser molestado por el tiempo o
                                algún otro problema banal. Bonita esa historia
                                verdad?, ojala fuera verdad, pero SekAiJK nace
                                de pensar en un mundo donde puedas hablar de
                                anime y videojuegos, por ello se eligió 世界
                                (Sekai) y ahora la JK son iniciales, aunque
                                parece que hacer referencia al JK de algunos
                                términos que adoptaron en japón, pero no solo
                                son las iniciales de los primero integrantes del
                                canal, esto incluye la A mayúscula en sekai
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Image
                            src="/assets/hikari/hikari-explain.png"
                            alt="hikari-explain"
                            width={720}
                            height={720}
                            className="w-96 h-96 object-cover rounded-full"
                            priority
                        />
                    </div>
                </section>
                <section className="my-6 flex flex-col-reverse justify-center items-center gap-4 py-2 px-4 rounded-xl overflow-hidden bg-neutral-900 xl:flex-row md:bg-transparent">
                    <div className="max-w-2xl flex justify-center items-center">
                        <div className="text-center py-2 px-4 rounded-xl overflow-hidden md:bg-neutral-900">
                            <h2 className="text-5xl font-bold font-lato text-center">
                                Preparados
                            </h2>
                            <Separator className="my-2" />
                            <p>
                                ¡Prepárate para vivir emocionantes aventuras,
                                descubrir los secretos mejor guardados del anime
                                y explorar el vasto mundo de los videojuegos con
                                nosotros! Siéntete como en casa y disfruta al
                                máximo de nuestro contenido. ¡Suscríbete, activa
                                la campana y únete a esta comunidad llena de
                                diversión y camaradería!
                            </p>
                        </div>
                    </div>
                </section>
                <section className="my-6 gap-4 py-2 px-4 rounded-xl overflow-hidden bg-neutral-900 md:bg-transparent">
                    <h2 className="text-4xl text-center">Equipo</h2>
                    <Separator className="my-4" />
                    <p className="text-muted-foreground text-center">
                        Conoce a nuestro equipo
                    </p>
                    <div className="flex justify-center items-center gap-4 relative">
                        <div className="min-w-[1080px] w-full max-h-720">
                            <Image
                                src="/assets/hikari/hikari-teambg.png"
                                alt="Nami"
                                width={1080}
                                height={720}
                                className="w-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <Link
                            href={"/team"}
                            className="bg-transparent text-primary border-2 border-primary py-2 px-3 rounded-lg my-4 hover:bg-primary hover:text-white transition duration-150"
                        >
                            <p>Ver equipo</p>
                        </Link>
                    </div>
                </section>
            </article>
        </div>
    );
}

export default AboutUs;
