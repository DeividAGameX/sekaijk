import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import PostModel from "@/features/posts/lib/PostModel";
import CarouselContent from "@/features/public/Home/components/Carousel/CarouselContent";
import CarouselItem from "@/features/public/Home/components/Carousel/CarouselItem";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
    description:
        "SekAiJK es tu rincón definitivo para disfrutar lo mejor del anime, los videojuegos y la cultura geek. Desde 2022, compartimos contenido lleno de referencias, humor, monas chinas y mucho carisma. Si buscas diversión y aventuras al estilo otaku, este es tu lugar.",
    keywords: [
        "SekAiJK",
        "anime",
        "videojuegos",
        "cultura geek",
        "entretenimiento",
        "humor",
        "contenido otaku",
        "reseñas de anime",
        "noticias de videojuegos",
    ],
    openGraph: {
        title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
        description:
            "SekAiJK es tu rincón definitivo para disfrutar lo mejor del anime, los videojuegos y la cultura geek. Desde 2022, compartimos contenido lleno de referencias, humor, monas chinas y mucho carisma.",
        url: "https://sekaijk.com",
        type: "website",
        siteName: "SekAiJK",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_URL}/assets/Perfil.jpg`,
                alt: "Logo de SekAiJK",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SekAiJK - Anime, Videojuegos y Cultura Geek",
        description:
            "Descubre un mundo lleno de anime, videojuegos y cultura geek con SekAiJK. Humor, carisma y mucho contenido otaku desde 2022.",
        images: [`${process.env.NEXT_PUBLIC_URL}/assets/perfil.jpg`],
    },
    authors: [
        {
            name: "SekAiJK",
            url: `${process.env.NEXT_PUBLIC_URL}/`,
        },
    ],
    creator: "SekAiJK",
    publisher: "SekAiJK",
};

export default async function Home() {
    // Carousel
    const carousel = await PostModel.findMany({
        select: {
            slug: true,
            title: true,
            banner: true,
            createdAt: true,
            Categories: {
                select: {
                    name: true,
                    slug: true,
                },
            },
        },
        where: {
            status: "PUBLISHED",
            slug: {
                not: null,
            },
        },
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
    });
    // Noticias
    const notices = await PostModel.findMany({
        select: {
            slug: true,
            title: true,
            banner: true,
            description: true,
            createdAt: true,
            Categories: {
                select: {
                    slug: true,
                },
            },
            Tags: {
                select: {
                    name: true,
                    color: true,
                },
            },
        },
        where: {
            status: "PUBLISHED",
            slug: {
                not: null,
            },
            categoryId: 2,
        },
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
    });

    // Reseñas
    const reviews = await PostModel.findMany({
        select: {
            slug: true,
            title: true,
            banner: true,
            description: true,
            createdAt: true,
            Categories: {
                select: {
                    slug: true,
                },
            },
            Tags: {
                select: {
                    name: true,
                    color: true,
                },
            },
        },
        where: {
            status: "PUBLISHED",
            slug: {
                not: null,
            },
            categoryId: 1,
        },
        take: 4,
        orderBy: {
            createdAt: "desc",
        },
    });

    // De interés

    const deIn = await PostModel.findMany({
        select: {
            slug: true,
            title: true,
            banner: true,
            description: true,
            createdAt: true,
            Categories: {
                select: {
                    slug: true,
                },
            },
            Tags: {
                select: {
                    name: true,
                    color: true,
                },
            },
        },
        where: {
            status: "PUBLISHED",
            slug: {
                not: null,
            },
            categoryId: 3,
        },
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        // Carousel
        <>
            <CarouselContent posts={carousel}>
                {carousel.map((post, i) => (
                    <CarouselItem key={post.slug} index={i}>
                        <article className="relative w-full h-screen">
                            <Image
                                src={post.banner ?? ""}
                                alt={post.title}
                                width={1920}
                                height={1080}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-neutral-950/40 w-full h-full">
                                <div className="flex gap-2 flex-col justify-end max-w-[1580px] w-full mx-auto h-full md:px-2 md:justify-center">
                                    <div>
                                        <span className="bg-primary rounded-lg py-1 px-2">
                                            {post.Categories?.name}
                                        </span>
                                    </div>
                                    <div className="rounded-t-xl px-4 pb-14 md:py-3 bg-neutral-950/50 backdrop-blur-2xl md:rounded-xl md:w-2xl">
                                        <h1 className="text-4xl text-center uppercase font-bold text-ellipsis line-clamp-3">
                                            {post.title}
                                        </h1>
                                        <Separator className="my-4" />
                                        <div className="flex gap-4 mt-2 items-center justify-between px-4">
                                            <p>
                                                {moment(post.createdAt).format(
                                                    "LLL"
                                                )}
                                            </p>
                                            <Link
                                                href={`/${post.Categories?.slug}/${post.slug}`}
                                                className="text-primary border-primary border-2 rounded-lg py-1 px-2 hover:text-white hover:bg-primary transition duration-150"
                                            >
                                                <p>Read More</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="container py-8">
                {/* Noticias */}
                <div className="mb-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-lato font-bold uppercase">
                            Ultimas noticias
                        </h1>
                        <Link
                            href={"/noticias"}
                            className="hover:text-primary transition duration-150"
                        >
                            Ver mas <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {notices.map((post, i) =>
                            i == 0 ? (
                                <article
                                    key={i}
                                    className="col-span-4 lg:col-span-2 relative h-80 overflow-hidden rounded-xl"
                                >
                                    <Image
                                        src={post.banner ?? ""}
                                        alt={post.title}
                                        width={920}
                                        height={570}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="w-full h-full flex items-end absolute top-0 left-0 bg-gradient-to-t from-neutral-900 to-transparent">
                                        <div className="pb-2 px-6 w-full">
                                            <header>
                                                {(post.Tags ?? [])
                                                    .slice(0, 1)
                                                    .map((tag, i) => (
                                                        <Badge
                                                            key={i}
                                                            style={{
                                                                backgroundColor:
                                                                    tag.color,
                                                            }}
                                                        >
                                                            {tag.name}
                                                        </Badge>
                                                    ))}
                                                <h1 className="text-xl tracking-tight font-lato font-semibold text-ellipsis line-clamp-2 mt-2">
                                                    <Link
                                                        href={`/${post.Categories?.slug}/${post.slug}`}
                                                        className="hover:text-primary transition duration-150"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h1>
                                            </header>
                                            <article className="py-2 w-full">
                                                <p className="text-sm line-clamp-2 text-neutral-400 pb-1">
                                                    {post.description}
                                                </p>
                                                <div className="w-full flex justify-between items-centers">
                                                    <p className="text-sm py-1 align-middle text-neutral-400">
                                                        {moment(
                                                            post.createdAt
                                                        ).format("LLL")}
                                                    </p>
                                                    <Link
                                                        href={`/${post.slug}`}
                                                        className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                                                    >
                                                        Leer
                                                    </Link>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </article>
                            ) : (
                                <article
                                    key={i}
                                    className="col-span-4 md:col-span-2 lg:col-span-1 h-80 flex flex-col overflow-hidden rounded-xl border-2 border-neutral-800"
                                >
                                    <div className="h-6/12 relative min-w-0">
                                        <Image
                                            src={post.banner ?? ""}
                                            alt={post.title}
                                            width={920}
                                            height={570}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2">
                                            {(post.Tags ?? [])
                                                .slice(0, 1)
                                                .map((tag, i) => (
                                                    <Badge
                                                        key={i}
                                                        style={{
                                                            backgroundColor:
                                                                tag.color,
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                    <div className="h-6/12 flex flex-col gap-2 px-3 py-2">
                                        <header className="h-14">
                                            <h1 className="text-lg line-clamp-1 text-ellipsis font-lato md:line-clamp-2">
                                                <Link
                                                    href={`/${post.Categories?.slug}/${post.slug}`}
                                                    className="font-semibold hover:text-primary transition duration-150"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h1>
                                        </header>
                                        <div className="flex-1">
                                            <p className="flex-1 text-neutral-400 text-sm line-clamp-2 text-ellipsis">
                                                {post.description}
                                            </p>
                                        </div>
                                        <div className="w-full flex flex-col text-center justify-between items-centers md:flex-row md:text-left">
                                            <p className="text-sm py-1 align-middle text-neutral-400">
                                                {moment(post.createdAt).format(
                                                    "LLL"
                                                )}
                                            </p>
                                            <Link
                                                href={`/${post.slug}`}
                                                className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                                            >
                                                Leer
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                </div>
                {/* Reseñas */}
                <div className="mb-16">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-neutral-500">Lo mas reciente</p>
                            <h1 className="text-3xl font-lato font-bold uppercase">
                                Reseñas
                            </h1>
                        </div>
                        <Link
                            href={"/reviews"}
                            className="hover:text-primary transition duration-150"
                        >
                            Ver mas <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex flex-col gap-6 lg:flex-row">
                        {reviews.slice(0, 1).map((post, i) => (
                            <article
                                key={i}
                                className="flex-1 flex flex-col overflow-hidden rounded-xl border-2 border-neutral-800"
                            >
                                <div className="relative min-h-0">
                                    <Image
                                        src={post.banner ?? ""}
                                        alt={post.title}
                                        width={920}
                                        height={570}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-0 right-0 flex gap-2 px-3 py-2">
                                        {(post.Tags ?? [])
                                            .slice(0, 2)
                                            .map((tag, i) => (
                                                <Badge
                                                    key={i}
                                                    style={{
                                                        backgroundColor:
                                                            tag.color,
                                                    }}
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex-1 px-3 py-2 flex flex-col gap-2">
                                    <header className="flex gap-3">
                                        <div className="text-center">
                                            <p className="text-4xl font-lato font-bold">
                                                {moment(post.createdAt).format(
                                                    "DD"
                                                )}
                                            </p>
                                            <Separator className="bg-white my-1" />
                                            <p className="text-2xl font-lato font-bold">
                                                {moment(post.createdAt).format(
                                                    "MMM"
                                                )}
                                            </p>
                                        </div>
                                        <h1 className="text-4xl line-clamp-2 font-lato">
                                            <Link
                                                href={`/${post.Categories?.slug}/${post.slug}`}
                                                className="font-semibold hover:text-primary transition duration-150"
                                            >
                                                {post.title}
                                            </Link>
                                        </h1>
                                    </header>
                                    <div className="flex-1">
                                        <p className="text-neutral-400 text-sm line-clamp-2">
                                            {post.description}
                                        </p>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm py-1 text-neutral-400">
                                            {moment(post.createdAt).format(
                                                "LLL"
                                            )}
                                        </p>
                                        <Link
                                            href={`/${post.Categories?.slug}/${post.slug}`}
                                            className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                                        >
                                            Leer
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                        <div className="flex-1 grid grid-rows-3 gap-3 overflow-y-auto">
                            {reviews.slice(1).map((post, i) => (
                                <article key={i} className="w-full flex gap-2">
                                    <Image
                                        src={post.banner ?? ""}
                                        alt={post.title}
                                        width={920}
                                        height={570}
                                        className="w-42 object-cover"
                                    />
                                    <div className="w-full flex flex-col gap-2 px-3 py-2">
                                        <header className="h-14">
                                            <h1 className="text-lg line-clamp-2 text-ellipsis font-lato">
                                                <Link
                                                    href={`/${post.Categories?.slug}/${post.slug}`}
                                                    className="font-semibold hover:text-primary transition duration-150"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h1>
                                        </header>
                                        <div className="flex-1">
                                            <p className="text-neutral-400 text-sm line-clamp-3 text-ellipsis">
                                                {post.description}
                                            </p>
                                        </div>
                                        <div className="w-full flex justify-between items-centers">
                                            <p className="text-sm py-1 align-middle text-neutral-400">
                                                {moment(post.createdAt).format(
                                                    "LLL"
                                                )}
                                            </p>
                                            <Link
                                                href={`/${post.Categories?.slug}/${post.slug}`}
                                                className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                                            >
                                                Leer
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
                {/* De interés */}
                <div className="mb-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-lato font-bold uppercase">
                            De interés
                        </h1>
                        <Link
                            href={"/noticias"}
                            className="hover:text-primary transition duration-150"
                        >
                            Ver mas <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {deIn.map((post, i) => (
                            <article
                                key={i}
                                className="h-80 grid grid-rows-12 overflow-hidden rounded-xl border-2 border-neutral-800"
                            >
                                <div className="relative row-span-6">
                                    <Image
                                        src={post.banner ?? ""}
                                        alt={post.title}
                                        width={920}
                                        height={570}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2">
                                        {(post.Tags ?? [])
                                            .slice(0, 1)
                                            .map((tag, i) => (
                                                <Badge
                                                    key={i}
                                                    style={{
                                                        backgroundColor:
                                                            tag.color,
                                                    }}
                                                >
                                                    {tag.name}
                                                </Badge>
                                            ))}
                                    </div>
                                </div>
                                <div className="row-span-6 flex flex-col gap-2 px-3 py-2">
                                    <header className="h-14">
                                        <h1 className="text-lg line-clamp-2 text-ellipsis font-lato">
                                            <Link
                                                href={`/${post.Categories?.slug}/${post.slug}`}
                                                className="font-semibold hover:text-primary transition duration-150"
                                            >
                                                {post.title}
                                            </Link>
                                        </h1>
                                    </header>
                                    <p className="flex-1 text-neutral-400 text-sm line-clamp-2 text-ellipsis">
                                        {post.description}
                                    </p>
                                    <div className="w-full flex justify-between items-centers">
                                        <p className="text-sm py-1 align-middle text-neutral-400">
                                            {moment(post.createdAt).format(
                                                "LLL"
                                            )}
                                        </p>
                                        <Link
                                            href={`/${post.Categories?.slug}/${post.slug}`}
                                            className="text-neutral-500 py-1 px-2 hover:text-primary transition duration-150"
                                        >
                                            Leer
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
