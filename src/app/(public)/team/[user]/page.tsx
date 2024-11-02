import {prisma} from "@/lib/prisma";
import {faClock, faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Breadcrumb, Divider} from "antd";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import ListPosts from "@/components/public/Teams/PostList";
import moment from "moment";
import {Metadata} from "next";

type Props = {
    params: {user: string};
};

export async function generateStaticParams() {
    const users = await prisma.users.findMany({
        select: {
            slug: true,
        },
        where: {
            slug: {
                not: null,
            },
            isPublic: true,
        },
    });
    return users.map((user) => ({user: user.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const user = await prisma.users.findFirst({
        where: {
            slug: params.user,
        },
    });
    if (!user) {
        throw new Error("Category not found");
    }
    return {
        title: `${user.name} | SekAiJK`,
        keywords: `SekAiJK, anime, videojuegos, películas, ${user.name}`,
        authors: [
            {
                name: user.name,
                url: `${process.env.NEXT_PUBLIC_URL}/team/${user.slug}`,
            },
        ],
        openGraph: {
            type: "profile",
            title: user.name,
            url: `${process.env.NEXT_PUBLIC_URL}/team/${user.slug}`,
            images: [
                {
                    url: user.avatar,
                    width: 1200,
                    height: 1200,
                },
                {
                    url: user.avatar,
                    width: 1080,
                    height: 1080,
                },
            ],
            siteName: "SekAiJK",
        },
        twitter: {
            card: "summary_large_image",
            title: user.name,
            images: [user.avatar],
        },
        robots: "index, follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_URL}/team/${user.slug}`,
        },
        publisher: "SekAiJK",
        creator: "SekAiJK",
    };
}

async function AuthorPage({params}: Props) {
    const userInfo = await prisma.users.findFirst({
        select: {
            avatar: true,
            banner: true,
            name: true,
            description: true,
            social: true,
            slug: true,
            Posts: {
                select: {
                    title: true,
                    banner: true,
                    description: true,
                    Categories: {
                        select: {
                            name: true,
                            slug: true,
                        },
                    },
                    slug: true,
                },
                orderBy: {createdAt: "desc"},
                take: 4,
            },
        },
        where: {
            slug: params.user,
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
    if (!userInfo) throw new Error("Usuario no encontrado");
    return (
        <>
            <article
                className="w-full h-[80vh] mx-auto bg-cover bg-center rounded-xl overflow-hidden md:h-96"
                style={{
                    backgroundImage: `url("${
                        userInfo.banner || "/assets/FondoPortada.jpg"
                    }")`,
                }}
            >
                <div className="w-full h-full bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-center items-center">
                    <header className="text-center flex flex-col gap-3 mt-16 justify-center items-center md:flex-row">
                        <Image
                            src={userInfo.avatar || "/assets/Perfil.jpg"}
                            className="w-32 h-32 rounded-full"
                            alt={userInfo.name}
                            width={1080}
                            height={1080}
                        />
                        <div className="flex justify-center items-center flex-col md:block">
                            <Breadcrumb
                                items={[
                                    {
                                        title: (
                                            <Link href={"/"}>
                                                <FontAwesomeIcon
                                                    icon={faHome}
                                                />
                                            </Link>
                                        ),
                                    },
                                    {
                                        title: <Link href={"/team"}>Team</Link>,
                                    },
                                    {
                                        title: params.user,
                                        className: "uppercase",
                                    },
                                ]}
                            />
                            <h1 className="text-6xl">{userInfo.name}</h1>
                        </div>
                    </header>
                    <article
                        className="max-w-5xl text-center"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                userInfo.description || ""
                            ),
                        }}
                    />
                </div>
            </article>
            <section className="max-w-7xl w-full mx-auto flex flex-wrap md:flex-nowrap">
                <ListPosts slug={userInfo.slug || ""} />
                <section className="max-w-md w-full p-4">
                    <Divider>
                        <h2 className="text-xl font-bold">
                            Artículos relacionados
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
                                    {moment(reciente.createdAt).format("LL")}
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
            </section>
        </>
    );
}

export default AuthorPage;
