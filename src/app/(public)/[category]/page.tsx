import ListCategories from "@/components/public/Categories";
import {prisma} from "@/lib/prisma";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Divider} from "antd";
import moment from "moment";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

type Props = {
    params: {category: string};
    searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateStaticParams() {
    const categories = await prisma.categories.findMany({
        select: {
            slug: true,
        },
    });
    return categories.map((c) => ({
        category: c.slug,
    }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const category = await prisma.categories.findFirst({
        where: {
            slug: params.category,
        },
    });
    if (!category) {
        return {
            title: "Not Found | SekAiJK",
        };
    }
    return {
        title: `${category.name} | SekAiJK`,
        description: category.description,
        keywords: `SekAiJK, anime, videojuegos, películas, ${category.name}`,
        authors: [
            {
                name: "SekAiJK",
                url: `${process.env.NEXT_PUBLIC_URL}/${category.slug}`,
            },
        ],
        openGraph: {
            type: "article",
            title: category.name,
            description: category.description,
            url: `${process.env.NEXT_PUBLIC_URL}/${category.slug}`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_URL}/assets/perfil.jpg`,
                    width: 1200,
                    height: 1200,
                },
                {
                    url: `${process.env.NEXT_PUBLIC_URL}/assets/perfil.jpg`,
                    width: 1080,
                    height: 1080,
                },
            ],
            siteName: "SekAiJK",
            tags: `SekAiJK, anime, videojuegos, películas, ${category.name}`,
        },
        twitter: {
            card: "summary_large_image",
            title: category.name,
            description: category.description,
            images: [`${process.env.NEXT_PUBLIC_URL}/assets/perfil.jpg`],
        },
        robots: "index, follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_URL}/${category.slug}`,
        },
        publisher: "SekAiJK",
        creator: "SekAiJK",
    };
}

async function category({params}: Props) {
    const category = await prisma.categories.findFirst({
        where: {
            slug: params.category,
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
    if (!category) {
        notFound();
    }
    return (
        <>
            <article
                className="w-full bg-cover bg-center bg-fixed"
                style={{backgroundImage: 'url("/assets/FondoPortada.jpg")'}}
            >
                <div className="w-full h-full bg-neutral-900/75 flex flex-col mt-16 items-center">
                    <div className="max-w-xl text-center px-2 py-6">
                        <Divider>
                            <header className="max-w-xl text-center py-6">
                                <h1 className="text-5xl font-bold">
                                    {category.name}
                                </h1>
                            </header>
                        </Divider>
                        <article className="">{category.description}</article>
                    </div>
                </div>
            </article>
            <section className="max-w-7xl w-full mx-auto flex flex-wrap md:flex-nowrap">
                <ListCategories slug={params.category} />
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

export default category;
