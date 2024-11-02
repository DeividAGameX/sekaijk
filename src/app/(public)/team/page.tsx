import ParallaxText from "@/components/ParallelText";
import {prisma} from "@/lib/prisma";
import {
    faDiscord,
    faFacebook,
    faGithub,
    faInstagram,
    faPinterest,
    faSpotify,
    faThreads,
    faTiktok,
    faTwitch,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {faCaretDown, faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Divider} from "antd";
import moment from "moment";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

const iconsSocialMedia = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok,
    discord: faDiscord,
    twitch: faTwitch,
    spotify: faSpotify,
    github: faGithub,
    thread: faThreads,
    pinterest: faPinterest,
};
const colorSocialMedia = {
    youtube: "hover:text-[#FE0000]",
    facebook: "hover:text-[#0866FF]",
    instagram: "hover:text-[#E4405F]",
    twitter: "hover:text-[#1DA1F2]",
    tiktok: "hover:text-[#000000]",
    twitch: "hover:text-[#6441A5]",
    discord: "hover:text-[#7289DA]",
    reddit: "hover:text-[#FF4500]",
    spotify: "hover:text-[#1DB954]",
    pinterest: "hover:text-[#BD081C]",
    threads: "hover:text-[#000000]",
    github: "hover:text-[#24292E]",
};

export async function generateMetadata(): Promise<Metadata> {
    const user = await prisma.users.findMany({
        select: {
            name: true,
        },
        where: {
            isPublic: true,
        },
    });
    return {
        title: "SekAiJK | Nuestro equipo",
        description:
            "Te presento a todos los miembros oficiales que pertenecen a este hermoso canal!",
        keywords: [
            "SekaiJK",
            ...user.map((u) => u.name),
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
            title: "Nuestro equipo | SekaiJK",
            description:
                "Te presento a todos los miembros oficiales que pertenecen a este hermoso canal!",
            url: "https://sekaijk.com/team",
            images: [
                {
                    url: "https://sekaijk.com/assets/Perfil.jpg",
                    width: 800,
                    height: 600,
                    alt: "SekaiJK logo",
                },
            ],
        },
        twitter: {
            title: "Nuestro equipo | SekaiJK",
            description:
                "Te presento a todos los miembros oficiales que pertenecen a este hermoso canal!",
            card: "summary_large_image",
            images: ["https://sekaijk.com/assets/Perfil.jpg"],
        },
    };
}

async function TeamInfo() {
    const team = await prisma.users.findMany({
        select: {
            slug: true,
            name: true,
            avatar: true,
            social: true,
            _count: {
                select: {
                    Posts: true,
                },
            },
        },
        where: {
            isPublic: true,
        },
    });
    const recent = await prisma.posts.findMany({
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
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });
    if (!team) {
        notFound();
    }
    return (
        <>
            <div className="h-96 bg-center bg-cover bg-[url('/assets/FondoPortada.jpg')]">
                <div className="w-full h-full bg-neutral-900/75 backdrop-blur-sm flex flex-col justify-center items-center">
                    <h1 className="text-8xl mt-10">Nuestro equipo</h1>
                    <div className="w-96">
                        <Divider>
                            <p className="text-xl">conócenos</p>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </Divider>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl w-full mx-auto">
                <div className="my-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {team.map((item) => (
                        <article
                            key={item.name}
                            className="w-full h-96 relative group/item"
                        >
                            <div className="w-full h-full absolute flex justify-center items-center px-3">
                                <div className="w-full h-[405px] bg-neutral-900 rounded-lg transition duration-200 group-hover/item:scale-[1.02]"></div>
                            </div>
                            <div className="w-full h-full rounded-lg overflow-hidden relative">
                                <Image
                                    className="w-full h-full object-cover transition duration-200 group-hover/item:scale-105"
                                    src={item.avatar}
                                    alt={item.name}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="w-full p-4 absolute bottom-0 left-0 bg-neutral-950">
                                <Link
                                    href={`/team/${item.slug}`}
                                    className="transition duration-200 hover:text-primary"
                                >
                                    <h1 className="text-3xl">
                                        {item.name}{" "}
                                        <span className="text-neutral-700 text-lg">
                                            {item._count.Posts}
                                        </span>
                                    </h1>
                                </Link>
                                <div className="w-full inline-block">
                                    {item.social.map((social) => (
                                        <a
                                            key={social.id}
                                            href={social.url}
                                            target="_blank"
                                            className={`text-sm transition duration-200 mx-2 ${
                                                colorSocialMedia[
                                                    social.icon as keyof typeof colorSocialMedia
                                                ]
                                            }`}
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    iconsSocialMedia[
                                                        social.icon as keyof typeof iconsSocialMedia
                                                    ]
                                                }
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <ParallaxText className="text-7xl opacity-20" baseVelocity={-2}>
                    Anime • juegos • manga •
                </ParallaxText>
                <div className="my-6">
                    <h1 className="text-5xl text-end font-bold uppercase">
                        Recientes
                    </h1>
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {recent.map((reciente) => (
                            <article
                                className="w-full h-60 relative p-2 overflow-hidden"
                                key={reciente.slug}
                            >
                                <header className="absolute bottom-0 left-0 p-4 z-[2]">
                                    <Link
                                        href={`/${reciente.Categories?.slug}`}
                                        className="p-1 bg-[--primary] font-bold"
                                    >
                                        {reciente.Categories?.name}
                                    </Link>
                                    <Link
                                        href={`/${reciente.Categories?.slug}/${reciente.slug}`}
                                        className="font-bold text-white transition duration-200 hover:text-primary"
                                    >
                                        <h3 className="text-xl font-bold">
                                            {reciente.title}
                                        </h3>
                                    </Link>
                                    <div className="text-sm text-neutral-500">
                                        <FontAwesomeIcon icon={faClock} />{" "}
                                        {moment(reciente.createdAt).format(
                                            "LL"
                                        )}
                                    </div>
                                </header>
                                <figure className="w-full h-full bg-neutral-900 rounded-md relative z-[1] before:bg-gradient-to-t before:from-body before:z-[2] before:w-full before:h-full before:absolute">
                                    <Image
                                        className="w-full h-full absolute object-cover"
                                        src={reciente.banner || ""}
                                        alt={reciente.title}
                                        width={900}
                                        height={600}
                                    />
                                </figure>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TeamInfo;
