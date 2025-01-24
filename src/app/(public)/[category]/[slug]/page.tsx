import {prisma} from "@/lib/prisma";
import moment from "moment";
import DOMPurify from "isomorphic-dompurify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleDot,
    faClock,
    faLink,
    faPlus,
    faShare,
} from "@fortawesome/free-solid-svg-icons";
import {Divider} from "antd";
import Image from "next/image";
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
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import CommentPost from "@/components/public/posts/Comments";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import RenderEmbend from "@/components/public/renderEmbedmen";

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
    youtube: "text-white hover:text-[#FE0000]",
    facebook: "text-white hover:text-[#0866FF]",
    instagram: "text-white hover:text-[#E4405F]",
    twitter: "text-white hover:text-[#1DA1F2]",
    tiktok: "text-white hover:text-[#000000]",
    twitch: "text-white hover:text-[#6441A5]",
    discord: "text-white hover:text-[#7289DA]",
    reddit: "text-white hover:text-[#FF4500]",
    spotify: "text-white hover:text-[#1DB954]",
    pinterest: "text-white hover:text-[#BD081C]",
    threads: "text-white hover:text-[#000000]",
    github: "text-white hover:text-[#24292E]",
};
const nameSocialMedia = {
    youtube: "Youtube",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter",
    tiktok: "TikTok",
    twitch: "Twitch",
    discord: "Discord",
    reddit: "Reddit",
    spotify: "Spotify",
    pinterest: "Pinterest",
    threads: "Threads",
    github: "GitHub",
};
const getBrightness = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
};

// Función para decidir el color del texto (negro o blanco)
const getTextColor = (hexColor: string) => {
    const brightness = getBrightness(hexColor);
    return brightness > 150 ? "#000000" : "#FFFFFF";
};

type Props = {
    params: {slug: string; categories: string};
    searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateStaticParams() {
    const posts = await prisma.posts.findMany({
        select: {
            slug: true,
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
    return posts.map((post) => ({
        categories: post.Categories?.slug,
        slug: post.slug,
    }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const post = await prisma.posts.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            author: {
                select: {
                    avatar: true,
                    name: true,
                    social: true,
                    slug: true,
                    description: true,
                },
            },
            Categories: true,
            Tags: true,
        },
    });
    if (!post) {
        return {
            title: "Not Found | SekAiJK",
            description: "La página solicitada no fue encontrada",
            keywords: [],
            openGraph: {},
            twitter: {},
            robots: "noindex, nofollow",
        };
    }
    return {
        title: `${post.title} | SekAiJK`,
        description: post.description,
        keywords: post.Tags.map((t) => t.name),
        authors: [
            {
                name: post.author.name,
                url: `${process.env.NEXT_PUBLIC_URL}/team/${post.author.slug}`,
            },
        ],
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            url: `${process.env.NEXT_PUBLIC_URL}/${post.Categories?.slug}/${post.slug}`,
            images: [
                {
                    url: post.banner || "",
                    width: 1200,
                    height: 630,
                },
                {
                    url: post.banner || "",
                    width: 1920,
                    height: 1080,
                },
            ],
            siteName: "SekAiJK",
            tags: post.Tags.map((t) => t.name),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.banner || ""],
        },
        robots: "index, follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_URL}/${post.Categories?.slug}/${post.slug}`,
        },
        publisher: post.author.name,
        creator: post.author.name,
    };
}

async function Posts({params}: Props) {
    const post = await prisma.posts.findFirst({
        where: {
            slug: params.slug,
        },
        include: {
            author: {
                select: {
                    avatar: true,
                    name: true,
                    social: true,
                    slug: true,
                    description: true,
                },
            },
            Categories: true,
            Tags: true,
        },
    });
    if (!post) {
        notFound();
    }
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
    const categories = await prisma.categories.findMany({
        include: {
            _count: {
                select: {
                    posts: {
                        where: {
                            slug: {
                                not: null,
                            },
                        },
                    },
                },
            },
        },
    });
    const relatedPost = await prisma.posts.findMany({
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
                notIn: [params.slug],
            },
            draft: {
                not: null,
            },
            categoryId: post.categoryId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 4,
    });
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post.title,
        image: [post.banner],
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: [
            {
                "@type": "Person",
                name: post.author.name,
                url: `${process.env.NEXT_PUBLIC_URL}/team/${post.author.slug}`,
            },
        ],
    };
    return (
        <article>
            <header
                className="relative w-full h-screen bg-center bg-cover bg-fixed"
                style={{backgroundImage: `url("${post?.banner}")`}}
            >
                <div className="w-full h-full bg-neutral-900/80">
                    <div className="w-full h-full left-0 top-0 flex justify-center items-center">
                        <div className="max-w-7xl w-full mx-auto p-6 sticky top-16">
                            <ul className="flex flex-wrap gap-2">
                                {post?.Tags.map((tag) => (
                                    <li
                                        key={tag.id}
                                        style={{
                                            backgroundColor: tag.color,
                                            color: getTextColor(tag.color),
                                        }}
                                        className="text-xs font-bold rounded-md p-1"
                                    >
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="text-7xl mb-2 font-lato border-b-[1px] border-b-[--primary]">
                                {post?.title}
                            </h1>
                            <span className="transition duration-300 opacity-75 group-hover/item:opacity-100">
                                <Link
                                    href={`/${post.Categories?.slug}`}
                                    className="hover:text-white"
                                >
                                    {post?.Categories?.name} •{" "}
                                </Link>
                                <time
                                    dateTime={moment(post?.createdAt).format(
                                        "YYYY-MM-DD HH:mm"
                                    )}
                                >
                                    {moment(post?.createdAt).format("LLL")}
                                </time>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <section className="max-w-7xl w-full mx-auto flex gap-2 flex-wrap lg:flex-nowrap">
                <main className="max-w-screen-lg w-full bg-primary relative p-2 rounded-lg">
                    <article
                        className="content-jk p-4"
                        dangerouslySetInnerHTML={{
                            // __html: DOMPurify.sanitize(post?.content || "", {
                            //     ADD_TAGS: ["iframe", "twitter"],
                            // }),
                            __html: post?.content || "",
                        }}
                    />
                    <RenderEmbend />
                    <Divider orientation="left">
                        <div className="flex flex-wrap lg:flex-nowrap">
                            <span className="bg-body p-2 font-bold w-full">
                                <FontAwesomeIcon
                                    icon={faShare}
                                    className="mr-2"
                                />
                                Compartir:{" "}
                            </span>
                            <CopyButton
                                toCopy={`${process.env.NEXT_PUBLIC_URL || ""}/${
                                    post?.Categories?.slug
                                }/${post?.slug}`}
                                className={`bg-body w-full p-2 hover:bg-neutral-900 text-white hover:text-primary`}
                            >
                                <FontAwesomeIcon
                                    icon={faLink}
                                    className="mr-2"
                                />
                                Copiar enlace
                            </CopyButton>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    (process.env.NEXT_PUBLIC_URL || "") +
                                        `/${post?.Categories?.slug}/${post?.slug}`
                                )}&p=${encodeURIComponent(
                                    "Lee esta publicación en SekAiJK"
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-body w-full p-2 hover:bg-neutral-900 ${colorSocialMedia["facebook"]}`}
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className="mr-2"
                                />
                                Facebook
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                    (process.env.NEXT_PUBLIC_URL || "") +
                                        `/${post?.Categories?.slug}/${post?.slug}`
                                )}&text=${encodeURIComponent(
                                    "Lee esta publicación en SekAiJK"
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-body w-full p-2 hover:bg-neutral-900 ${colorSocialMedia["twitter"]}`}
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="mr-2"
                                />
                                Twitter
                            </a>
                        </div>
                    </Divider>
                    <section
                        aria-labelledby="author"
                        className="flex flex-col items-center bg-body p-4 lg:flex-row"
                    >
                        <figure className="w-32 h-32 bg-neutral-900 overflow-hidden rounded-full">
                            <Image
                                className="w-full h-full object-cover"
                                src={post?.author.avatar || ""}
                                alt={post?.author.name || ""}
                                width={900}
                                height={600}
                            />
                        </figure>
                        <div className="flex-1 p-6">
                            <header className="flex flex-col gap-2 items-center lg:flex-row lg:items-end">
                                <Link
                                    href={`/team/${post?.author.slug}`}
                                    className="text-white transition duration-200 hover:text-primary"
                                >
                                    <h3 className="text-5xl font-bold">
                                        {post?.author.name}
                                    </h3>
                                </Link>
                                <ul className="flex flex-wrap text-xs justify-center items-center mb-3">
                                    {post?.author.social
                                        .slice(0, 2)
                                        .map((s) => (
                                            <li key={s.id}>
                                                <a
                                                    href={s.url}
                                                    className={`bg-body p-2 cursor-pointer transition duration-200 ${
                                                        colorSocialMedia[
                                                            s.icon as keyof typeof colorSocialMedia
                                                        ]
                                                    } hover:bg-neutral-900`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            iconsSocialMedia[
                                                                s.icon as keyof typeof iconsSocialMedia
                                                            ]
                                                        }
                                                        className="mr-2"
                                                    />
                                                    {
                                                        nameSocialMedia[
                                                            s.icon as keyof typeof nameSocialMedia
                                                        ]
                                                    }
                                                </a>
                                            </li>
                                        ))}
                                    {post?.author.social.slice(2).map((s) => (
                                        <li key={s.id}>
                                            <a
                                                href={s.url}
                                                className={`bg-body p-2 cursor-pointer text-center transition duration-200 ${
                                                    colorSocialMedia[
                                                        s.icon as keyof typeof colorSocialMedia
                                                    ]
                                                } hover:bg-neutral-900`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        iconsSocialMedia[
                                                            s.icon as keyof typeof iconsSocialMedia
                                                        ]
                                                    }
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </header>
                            <article
                                className="line-clamp-3 text-ellipsis"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        post?.author.description || ""
                                    ),
                                }}
                            />
                        </div>
                    </section>
                    <section aria-labelledby="comments">
                        <Divider orientation="center">
                            <h2 className="text-xl font-bold">Comentarios</h2>
                        </Divider>
                        <CommentPost
                            title={post?.title || ""}
                            slug={`${post?.Categories?.slug}-${post?.slug}`}
                            url={`${process.env.NEXT_PUBLIC_URL}/${post?.Categories?.slug}/${post?.slug}`}
                        />
                    </section>
                </main>
                <aside className="w-full py-4 lg:max-w-xs">
                    <div className="sticky top-20">
                        <section>
                            <Divider orientation="left">
                                <h2 className="text-xl font-bold">
                                    Categorías
                                </h2>
                            </Divider>
                            <ul className="bg-body">
                                {categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="p-4 my-5 transition duration-300 hover:text-primary cursor-pointer"
                                    >
                                        <a
                                            href={`/${category.slug}`}
                                            className="transition duration-300 hover:text-primary"
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleDot}
                                            />{" "}
                                            {category.name} (
                                            {category._count.posts})
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <Divider orientation="left">
                                <h2 className="text-xl font-bold">
                                    Publicaciones recientes
                                </h2>
                            </Divider>
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
                        </section>
                    </div>
                </aside>
            </section>
            <section className="max-w-7xl w-full mx-auto bg-body my-3 p-4">
                <header>
                    <h2 className="text-4xl font-bold">Relacionadas</h2>
                    <div className="flex gap-2 items-center">
                        <span className="w-auto text-nowrap text-lg text-neutral-600">
                            Relacionado con:{" "}
                            <b className="text-neutral-500">
                                {post.Categories?.name}
                            </b>
                        </span>
                        <div className="h-[2px] w-full bg-neutral-800" />
                        <Link
                            href={`/${post.Categories?.slug}`}
                            className="font-bold text-[--primary] text-nowrap text-white transition duration-200 hover:text-primary"
                        >
                            Ver{" "}
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        </Link>
                    </div>
                </header>
                <div className="grid gap-2 grid-cols-4 mt-3 relative">
                    {relatedPost.map((post) => (
                        <article
                            key={post.slug}
                            className="h-52 relative group/items overflow-hidden"
                        >
                            <Link
                                href={`/${post.Categories?.slug}/${post.slug}`}
                            >
                                <figure className="w-full h-full bg-neutral-900 rounded-md relative z-[1] before:bg-gradient-to-t before:from-body before:z-[2] before:w-full before:h-full before:absolute">
                                    <Image
                                        className="w-full h-full absolute object-cover transition duration-200 group-hover/items:scale-105"
                                        src={post.banner || ""}
                                        alt={post.title}
                                        width={900}
                                        height={600}
                                    />
                                </figure>
                                <div className="absolute w-full z-[2] left-0 bottom-0 p-3">
                                    <span className="p-1 bg-[--primary] font-bold">
                                        {post.Categories?.name}
                                    </span>
                                    <h3 className="text-xl font-bold">
                                        {post.title}
                                    </h3>
                                    <div className="text-sm text-neutral-500">
                                        <FontAwesomeIcon icon={faClock} />{" "}
                                        {moment(post.createdAt).format("LL")}
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
            <section>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
                />
            </section>
        </article>
    );
}

export default Posts;
