import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import PostModel from "@/features/posts/lib/PostModel";
import RecommendationPost from "@/features/public/components/Recomendation";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCircle, faEllipsis, faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import DisqusComments from "@/features/public/components/DisqusComment";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CopyButton from "@/features/public/components/CopyButton";
import Script from "next/script";
import RenderEmbed from "@/features/public/components/RenderEmbed";
import {notFound} from "next/navigation";
import {Metadata} from "next";

interface Props {
    params: Promise<{slug: string; category: string}>;
}

export async function generateStaticParams() {
    const posts = await PostModel.findMany({
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
            draftId: {
                not: null,
            },
        },
    });
    return posts.map((post) => ({
        category: post.Categories?.slug,
        slug: post.slug,
    }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug, category} = await params;
    const post = await PostModel.findUnique({
        select: {
            title: true,
            description: true,
            banner: true,
            createdAt: true,
            Categories: {
                select: {
                    name: true,
                },
            },
            Tags: true,
            author: {
                select: {
                    name: true,
                    slug: true,
                },
            },
        },
        where: {
            slug: slug,
        },
    });
    if (!post)
        return {
            title: "Not Found | SekAiJK",
            description: "La página solicitada no fue encontrada",
            keywords: [],
            openGraph: {},
            twitter: {},
            robots: "noindex, nofollow",
        };
    return {
        title: `${post.title} | SekAiJK`,
        description:
            post.description ||
            `Lee el artículo "${post.title}" en SekAiJK sobre ${
                post.Categories?.name ?? "anime y videojuegos"
            }.`,
        keywords: [
            post.title,
            post.Categories?.name ?? "SekAiJK",
            ...post.Tags.map((t) => t.name),
            post.author.name ?? "SekAiJK",
        ],
        authors: post.author
            ? [
                  {
                      name: post.author.name,
                      url: `${process.env.NEXT_PUBLIC_URL}/team /${post.author.slug}`,
                  },
              ]
            : [],
        creator: post.author?.name ?? "SekAiJK",
        publisher: post.author?.name ?? "SekAiJK",
        openGraph: {
            type: "article",
            title: `${post.title} | SekAiJK`,
            description:
                post.description ||
                `Explora este artículo sobre ${
                    post.Categories?.name ?? "la cultura geek"
                }.`,
            url: `${process.env.NEXT_PUBLIC_URL}/${category}/${slug}`,
            siteName: "SekAiJK",
            images: post.banner
                ? [
                      {
                          url: post.banner,
                          width: 1200,
                          height: 630,
                      },
                      {
                          url: post.banner,
                          width: 1920,
                          height: 1080,
                      },
                  ]
                : [],
            tags: post.Tags.map((t) => t.name),
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} | SekAiJK`,
            description:
                post.description ||
                `Lee el artículo en SekAiJK sobre ${
                    post.Categories?.name ?? "cultura geek"
                }.`,
            images: post.banner ? [post.banner] : [],
        },
        robots: "index, follow",
    };
}

async function Post({params}: Props) {
    const {slug, category} = await params;
    const post = await PostModel.findUnique({
        select: {
            title: true,
            banner: true,
            body: true,
            createdAt: true,
            Categories: {
                select: {
                    name: true,
                },
            },
            Tags: {
                select: {
                    name: true,
                    color: true,
                },
            },
            author: {
                select: {
                    name: true,
                    avatar: true,
                    social: true,
                    description: true,
                    slug: true,
                },
            },
        },
        where: {
            slug,
        },
    });
    if (!post) return notFound();
    post.body = compileMarkdownToHtml(post.body ?? "");
    post.author.description = compileMarkdownToHtml(
        post.author.description ?? ""
    );
    return (
        <main className="container">
            <article className="w-full">
                <header className="relative rounded-xl overflow-hidden mt-16">
                    <Image
                        src={post.banner ?? ""}
                        alt={post.title}
                        width={1280}
                        height={720}
                        className="w-full h-auto min-h-[520px] max-h-[520px] object-cover"
                        priority
                    />
                    {/* <div className="absolute bottom-0 w-full bg-gradient-to-t from-black from-10% to-transparent px-6 py-4"> */}
                    <div className="absolute top-0 left-0 h-full w-full md:px-2 md:h-auto md:top-auto md:bottom-2">
                        <div className="w-full h-full flex flex-col justify-end bg-neutral-900/70 rounded-xl py-4 px-6 md:block md:backdrop-blur-sm">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(post.Tags ?? []).map((tag, i) => (
                                    <Badge
                                        key={i}
                                        className="text-sm"
                                        style={{backgroundColor: tag.color}}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-5xl font-bold font-lato">
                                {post.title}
                            </h1>
                            <Separator className="my-2" />
                            <div className="flex flex-col justify-between items-center md:flex-row">
                                <p className="text-muted-foreground">
                                    {post.Categories?.name}
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="mx-2"
                                    />
                                    {moment(post.createdAt).format("LLL")}
                                </p>
                                <p className="text-muted-foreground">
                                    Por: {post.author.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex gap-2 mt-4 flex-col xl:flex-row">
                    <div className="max-w-screen-lg w-full">
                        <div className="flex flex-col gap-2 md:flex-row-reverse">
                            <div className="max-w-screen-lg w-full article px-4">
                                <section
                                    dangerouslySetInnerHTML={{
                                        __html: post.body,
                                    }}
                                />
                            </div>
                            <div className="w-full shrink-1 py-2 md:w-12">
                                <h3 className="text-center text-xl font-bold font-lato my-2 md:hidden">
                                    Puedes compartirlo
                                </h3>
                                <div className="w-full sticky top-16 rounded-2xl overflow-hidden bg-neutral-800 text-xl flex justify-center items-center md:flex-col">
                                    <CopyButton
                                        className="w-full flex justify-center p-3 group hover:text-primary hover:bg-neutral-700 transition duration-150"
                                        toCopy={`${process.env.NEXT_PUBLIC_URL}/${category}/${slug}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLink}
                                            className="text-2xl group-hover:scale-110 md:text-xl transition duration-150"
                                        />
                                    </CopyButton>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${
                                            encodeURIComponent(
                                                process.env.NEXT_PUBLIC_URL ||
                                                    ""
                                            ) + `/${category}/${slug}`
                                        }&p=${encodeURIComponent(
                                            "Lee esta publicación en SekAiJK"
                                        )}`}
                                        className="w-full flex justify-center p-3 group hover:text-primary hover:bg-neutral-700 transition duration-150"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className="text-2xl group-hover:scale-110 md:text-xl transition duration-150"
                                        />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${
                                            encodeURIComponent(
                                                process.env.NEXT_PUBLIC_URL ||
                                                    ""
                                            ) + `/${category}/${slug}`
                                        }&text=${encodeURIComponent(
                                            "Lee esta publicación en SekAiJK"
                                        )}`}
                                        className="w-full flex justify-center p-3 group hover:text-primary hover:bg-neutral-700 transition duration-150"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="text-2xl group-hover:scale-110 md:text-xl transition duration-150"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex gap-4 justify-center flex-col bg-neutral-900 rounded-xl py-3 px-4 my-4 md:flex-row md:bg-transparent">
                            <div className="flex w-full gap-10 items-center min-h-32 flex-col md:bg-neutral-900 md:flex-row md:rounded-xl md:py-3 md:px-4">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={720}
                                    height={720}
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                                <div className="w-full">
                                    <h2 className="text-2xl font-bold font-lato">
                                        {post.author.name}
                                    </h2>
                                    <div
                                        className="line-clamp-2 my-3"
                                        dangerouslySetInnerHTML={{
                                            __html: post.author.description,
                                        }}
                                    />
                                    <Link
                                        href={`/team/${post.author.slug}`}
                                        className="text-muted-foreground hover:text-secondary-red transition duration-150"
                                    >
                                        Ver mas de mis publicaciones
                                    </Link>
                                </div>
                            </div>
                            <div className="rounded-xl bg-neutral-900 text-xl flex items-center overflow-hidden md:hidden">
                                {(post.author.social ?? [])
                                    .slice(0, 3)
                                    .map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className="flex-1 w-full flex justify-center items-center py-1 px-3 hover:text-primary hover:bg-neutral-800 transition duration-150"
                                        >
                                            <i
                                                className={`bi bi-${social.icon}`}
                                            />
                                        </a>
                                    ))}
                                {(post.author.social ?? []).length > 5 ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex-1 py-1 px-3 border-0 bg-neutral-900 outline-0 hover:text-primary hover:bg-neutral-800 transition duration-150">
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="min-w-0">
                                            {(post.author.social ?? [])
                                                .slice(3)
                                                .map((social, i) => (
                                                    <DropdownMenuItem key={i}>
                                                        <a href={social.url}>
                                                            <i
                                                                className={`bi bi-${social.icon}`}
                                                            />
                                                        </a>
                                                    </DropdownMenuItem>
                                                ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    (post.author.social ?? [])
                                        .slice(3, 4)
                                        .map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.url}
                                                className="flex-1 w-full flex justify-center items-center py-1 px-3 hover:text-primary hover:bg-neutral-800 transition duration-150"
                                            >
                                                <i
                                                    className={`bi bi-${social.icon}`}
                                                />
                                            </a>
                                        ))
                                )}
                            </div>
                            {/* PC y Laptop */}
                            <div className="rounded-xl bg-neutral-900 text-xl hidden flex-col items-center overflow-hidden md:flex">
                                {(post.author.social ?? [])
                                    .slice(0, 2)
                                    .map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.url}
                                            className="flex-1 w-full flex justify-center items-center py-1 px-3 hover:text-primary hover:bg-neutral-800 transition duration-150"
                                        >
                                            <i
                                                className={`bi bi-${social.icon}`}
                                            />
                                        </a>
                                    ))}
                                {(post.author.social ?? []).length > 4 ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex-1 py-1 px-3 border-0 bg-neutral-900 outline-0 hover:text-primary hover:bg-neutral-800 transition duration-150">
                                            <FontAwesomeIcon
                                                icon={faEllipsis}
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="min-w-0">
                                            {(post.author.social ?? [])
                                                .slice(2)
                                                .map((social, i) => (
                                                    <DropdownMenuItem key={i}>
                                                        <a href={social.url}>
                                                            <i
                                                                className={`bi bi-${social.icon}`}
                                                            />
                                                        </a>
                                                    </DropdownMenuItem>
                                                ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    (post.author.social ?? [])
                                        .slice(2, 3)
                                        .map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.url}
                                                className="flex-1 w-full flex justify-center items-center py-1 px-3 hover:text-primary hover:bg-neutral-800 transition duration-150"
                                            >
                                                <i
                                                    className={`bi bi-${social.icon}`}
                                                />
                                            </a>
                                        ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="w-full sticky top-16">
                            <p className="text-lg font-semibold">
                                Publicaciones relacionadas
                            </p>
                            <Separator className="my-2" />
                            <RecommendationPost
                                slug={category}
                                query={`slugIgnore=${slug}`}
                                orientation="vertical"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full my-3">
                    <p className="text-lg font-semibold">
                        Publicaciones mas recientes
                    </p>
                    <Separator className="my-2" />
                    <RecommendationPost
                        query={`slugIgnore=${slug}`}
                        orientation="horizontal"
                    />
                </div>
                <DisqusComments
                    title={post.title}
                    url={`${process.env.BASE_URL}/${category}/${slug}`}
                    slug={slug}
                />
            </article>
            <RenderEmbed />
            <Script
                src="https://platform.twitter.com/widgets.js"
                strategy="afterInteractive"
            />
        </main>
    );
}

export default Post;
