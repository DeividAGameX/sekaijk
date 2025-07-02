import {Separator} from "@/components/ui/separator";
import TeamRoleModel from "@/features/teamRole/lib/TeamRoleModel";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import Image from "next/image";
import {SocialBgOutline} from "@/features/profile/utils/SocialMedia";
import Link from "next/link";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const teams = await TeamRoleModel.findMany({
        select: {
            name: true,
            Users: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            isSection: true,
        },
    });
    const members = [];
    for (const team of teams) {
        members.push(...team.Users.map((user) => user.name));
    }
    return {
        title: "Nuestro equipo | SekAiJK",
        description:
            "Conoce al equipo detrás de SekAiJK: fans del anime, los videojuegos y la cultura geek que hacen posible este proyecto lleno de creatividad, humor y pasión.",
        keywords: [
            "SekAiJK",
            "equipo SekAiJK",
            "creadores de contenido",
            "anime",
            "videojuegos",
            "cultura geek",
            "YouTube",
            "contenido geek",
            "staff SekAiJK",
            ...teams.map((t) => t.name),
            ...members,
        ],
        openGraph: {
            title: "Nuestro equipo | SekAiJK",
            description:
                "Descubre a los creadores y colaboradores que dan vida a SekAiJK. ¡Conócenos!",
            url: "https://sekaijk.com/team",
            siteName: "SekAiJK",
            images: [
                {
                    url: "https://sekaijk.com/assets/Perfil.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Logo del equipo SekAiJK",
                },
            ],
            type: "profile",
        },
        twitter: {
            title: "Nuestro equipo | SekAiJK",
            description:
                "Conoce a los miembros oficiales del canal que comparten tu amor por el anime, los videojuegos y todo lo geek.",
            card: "summary_large_image",
            images: ["https://sekaijk.com/assets/Perfil.jpg"],
        },
        robots: "index, follow",
        creator: "SekAiJK",
        publisher: "SekAiJK",
        authors: [
            {
                name: "SekAiJK",
                url: "https://sekaijk.com/team",
            },
        ],
    };
}

async function TeamPage() {
    const members = await TeamRoleModel.findMany({
        select: {
            name: true,
            Users: {
                select: {
                    name: true,
                    avatar: true,
                    banner: true,
                    description: true,
                    Posts: {
                        select: {
                            title: true,
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
                            status: "PUBLISHED",
                        },
                        take: 1,
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                    TeamRoles: {
                        where: {
                            isSection: false,
                        },
                    },
                    social: true,
                    slug: true,
                },
            },
        },
        where: {
            isSection: true,
        },
    });
    console.log(members);
    return (
        <article className="container mt-20">
            <header className="w-full h-64 overflow-hidden rounded-xl relative">
                <Image
                    className="w-full h-full object-cover"
                    src="/assets/hikari/team-bg.jpg"
                    alt="Categoría"
                    width={1920}
                    height={1080}
                />
                <div className="absolute w-full h-full bg-neutral-800/90 top-0 left-0 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <h1 className="text-white text-5xl font-bold">
                            Equipo
                        </h1>
                        <Separator />
                        <main className="max-w-2xl w-full text-center">
                            <p className="text-white text-sm">
                                Conoce a los integrantes del equipo de SekAi JK.
                            </p>
                        </main>
                    </div>
                </div>
            </header>
            {members.map((member, index) => (
                <section key={index} className="my-4">
                    <div className="flex gap-2 items-center px-3">
                        <h2 className="text-lg font-bold">{member.name}</h2>
                        <Separator className="flex-1" />
                    </div>
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {member.Users.map((user, indexU) => (
                            <section
                                key={`u-${indexU}`}
                                className="flex flex-col rounded-xl overflow-hidden bg-neutral-900"
                            >
                                <Image
                                    className="min-h-50 max-h-50 h-50 object-cover"
                                    src={
                                        user.banner ??
                                        "/assets/FondoPortada.jpg"
                                    }
                                    alt={user.name}
                                    width={720}
                                    height={256}
                                />
                                <div className="px-1">
                                    <div className="flex justify-center items-center -mt-16">
                                        <Image
                                            className="w-32 h-w-32 rounded-full object-cover border-2 border-neutral-900"
                                            width={720}
                                            height={720}
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                    </div>
                                    <div className="px-4 py-2 text-center">
                                        <h3 className="text-white text-4xl font-bold font-lato my-2">
                                            {user.name}
                                        </h3>
                                        <div className="flex items-center flex-wrap gap-2 justify-center">
                                            {user.TeamRoles.map((r, i) => (
                                                <div
                                                    key={`r-${i}`}
                                                    className="bg-primary py-1 px-2 text-sm text-white rounded-lg"
                                                >
                                                    {r.name}
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="text-white text-sm h-14 my-2 font-roboto line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: compileMarkdownToHtml(
                                                    user.description ?? ""
                                                ),
                                            }}
                                        />
                                        <div className="flex gap-2 flex-wrap justify-center my-2 py-1">
                                            {user.social.map(
                                                (social, indexS) => (
                                                    <a
                                                        key={`s-${indexS}`}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`px-2 py-1 rounded-full overflow-hidden flex justify-center items-center ${
                                                            SocialBgOutline[
                                                                social.icon as keyof typeof SocialBgOutline
                                                            ]
                                                        }`}
                                                    >
                                                        <i
                                                            className={`bi bi-${social.icon}`}
                                                        />
                                                    </a>
                                                )
                                            )}
                                        </div>
                                        <div className="text-center my-2">
                                            <p className="text-neutral-500">
                                                Articulo mas reciente
                                            </p>
                                            {user.Posts.length == 1 ? (
                                                <Link
                                                    href={`/${user.Posts[0].Categories?.slug}/${user.Posts[0].slug}`}
                                                    className="text-neutral-200 py-1 px-2 hover:text-primary transition duration-150"
                                                >
                                                    {user.Posts[0].title}
                                                </Link>
                                            ) : (
                                                <p>Sin publicación reciente</p>
                                            )}
                                        </div>
                                        <div className="my-4">
                                            <Link
                                                href={`/team/${user.slug}`}
                                                className="text-white bg-primary font-bold text-center py-2 px-4 rounded-md hover:bg-primary/90 transition duration-150"
                                            >
                                                Ver perfil completo
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>
                </section>
            ))}
            <section className="my-6">
                <div className="relative h-96 rounded-xl overflow-hidden md:h-64">
                    <Image
                        src="/assets/FondoPortada.jpg"
                        alt="Equipo de GameAnime Blog"
                        width={1080}
                        height={720}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <h2 className="text-3xl font-bold mb-4">
                                Síguenos en redes sociales
                            </h2>
                            <div className="flex justify-center gap-4 flex-col md:flex-row">
                                <a
                                    href="https://www.youtube.com/@SekAiJK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border-2 py-2 px-3 border-youtube text-youtube hover:bg-youtube hover:text-white transition duration-150"
                                >
                                    <i className="mr-2 h-5 w-5 bi bi-youtube" />
                                    YouTube
                                </a>
                                <a
                                    href="https://www.facebook.com/SekAiJKoficial/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border-2 py-2 px-3 border-facebook text-facebook hover:bg-facebook hover:text-white transition duration-150"
                                >
                                    <i className="mr-2 h-5 w-5 bi bi-facebook" />
                                    Facebook
                                </a>
                                <a
                                    href="https://www.instagram.com/sekai.j.k/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border-2 py-2 px-3 border-instagram text-instagram hover:bg-instagram hover:text-white transition duration-150"
                                >
                                    <i className="mr-2 h-5 w-5 bi bi-instagram" />
                                    Instagram
                                </a>
                                <a
                                    href="https://www.tiktok.com/@SekAiJK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border-2 py-2 px-3 border-white text-white hover:bg-tiktok hover:text-white hover:border-tiktok transition duration-150"
                                >
                                    <i className="mr-2 h-5 w-5 bi bi-tiktok" />
                                    TikTok
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}

export default TeamPage;
