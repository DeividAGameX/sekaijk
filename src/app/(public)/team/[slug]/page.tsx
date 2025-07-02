import {Separator} from "@/components/ui/separator";
import {SocialBgOutline} from "@/features/profile/utils/SocialMedia";
import CopyButton from "@/features/public/components/CopyButton";
import ListPostUser from "@/features/public/components/ListPost";
import TeamRoleModel from "@/features/teamRole/lib/TeamRoleModel";
import UsersModel from "@/features/users/lib/UsersModel";
import {compileMarkdownToHtml} from "@/utils/MarkdownToHtml";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Metadata} from "next";
import Image from "next/image";

interface Props {
    params: Promise<{slug: string}>;
}

export async function generateStaticParams() {
    const teams = await TeamRoleModel.findMany({
        select: {
            Users: {
                select: {
                    slug: true,
                },
            },
        },
        where: {
            isSection: true,
        },
    });
    const members = [];
    for (const team of teams) {
        members.push(...team.Users.map((user) => user.slug));
    }
    return members.map((s) => ({slug: s}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params;
    const user = await UsersModel.findUnique({
        select: {
            name: true,
            avatar: true,
            banner: true,
            description: true,
            slug: true,
            social: true,
            TeamRoles: {
                select: {
                    name: true,
                },
                where: {
                    isSection: false,
                },
            },
        },
        where: {
            slug,
        },
    });
    if (!user) return {title: "No se encontró el usuario."};
    return {
        title: `${user.name} | SekAiJK`,
        description: user.description?.length
            ? `${user.description.slice(0, 160)}${
                  user.description.length > 160 ? "..." : ""
              }`
            : `Conoce a ${user.name}, parte del equipo de SekAiJK.`,
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
            "monas chinas",
            user.name,
            ...user.TeamRoles.map((teamRole) => teamRole.name),
        ],
        authors: [
            {
                name: user.name,
                url: `${process.env.NEXT_PUBLIC_URL}/team/${user.slug}`,
            },
        ],
        creator: user.name ?? "SekAiJK",
        publisher: "SekAiJK",
        icons: user.avatar
            ? {
                  icon: user.avatar,
                  shortcut: user.avatar,
                  apple: user.avatar,
              }
            : undefined,
        openGraph: {
            type: "profile",
            title: `${user.name} | SekAiJK`,
            description: user.description?.length
                ? `${user.description.slice(0, 160)}${
                      user.description.length > 160 ? "..." : ""
                  }`
                : `Conoce a ${user.name}, parte del equipo de SekAiJK.`,
            url: `${process.env.NEXT_PUBLIC_URL}/team/${user.slug}`,
            siteName: "SekAiJK",
            images: user.banner
                ? [
                      {
                          url: user.banner,
                          width: 1200,
                          height: 630,
                      },
                      {
                          url: user.banner,
                          width: 1920,
                          height: 1080,
                      },
                  ]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title: `${user.name} | SekAiJK`,
            description: user.description?.length
                ? `${user.description.slice(0, 160)}${
                      user.description.length > 160 ? "..." : ""
                  }`
                : `Conoce a ${user.name}, parte del equipo de SekAiJK.`,
            images: user.banner ? [user.banner] : [],
        },
        robots: "index, follow",
    };
}

async function TeamMemberPage({params}: Props) {
    const {slug} = await params;
    const user = await UsersModel.findUnique({
        select: {
            name: true,
            avatar: true,
            banner: true,
            description: true,
            slug: true,
            social: true,
            TeamRoles: {
                select: {
                    name: true,
                },
                where: {
                    isSection: false,
                },
            },
        },
        where: {
            slug,
        },
    });
    if (!user) return <p>No se encontró el miembro del equipo.</p>;
    return (
        <article className="container mt-16">
            <header className="w-full h-64 overflow-hidden rounded-xl relative">
                <Image
                    className="w-full h-full object-cover"
                    src={user.banner ?? "/assets/FondoPortada.jpg"}
                    alt="Categoría"
                    width={1080}
                    height={720}
                />
                <div className="absolute w-full h-full bg-neutral-800/70 top-0 left-0 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <h1 className="text-white text-5xl font-bold font-lato">
                            {user.name}
                        </h1>
                        <p className="text-center text-muted-foreground">
                            {user.TeamRoles.map((r) => r.name).join(", ")}
                        </p>
                        <Separator />
                        <div className="flex items-center gap-2">
                            {user.social.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-neutral-950 text-lg rounded-full px-2 py-1 ${
                                        SocialBgOutline[
                                            social.icon as keyof typeof SocialBgOutline
                                        ]
                                    }`}
                                >
                                    <i className={`bi bi-${social.icon}`} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex gap-8 my-6 flex-col lg:flex-row">
                <section className="bg-neutral-900 p-4 rounded-xl w-full max-w-4xl">
                    <h2 className="text-2xl font-semibold font-lato">
                        Sobre: {user.name}
                    </h2>
                    <Separator className="my-2" />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: compileMarkdownToHtml(
                                user.description ?? ""
                            ),
                        }}
                    />
                </section>
                <div className="w-full lg:max-w-md">
                    <section className="bg-neutral-900 rounded-xl p-4 mb-2">
                        <h2 className="text-2xl font-semibold font-lato">
                            Estadísticas
                        </h2>
                        <Separator className="my-2" />
                    </section>
                    <section className="bg-neutral-900 rounded-xl p-4">
                        <h2 className="text-2xl font-semibold font-lato">
                            Compartir
                        </h2>
                        <Separator className="my-2" />
                        <div className="w-full text-sm flex gap-4 items-center flex-wrap">
                            <CopyButton
                                className="flex cursor-pointer justify-center p-3 group rounded-xl bg-neutral-800 hover:text-primary transition duration-150"
                                toCopy={`${process.env.NEXT_PUBLIC_URL}/team/${slug}`}
                            >
                                <FontAwesomeIcon
                                    icon={faLink}
                                    className="mr-2 group-hover:scale-110 md:text-xl transition duration-150"
                                />
                                Copiar enlace
                            </CopyButton>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${
                                    encodeURIComponent(
                                        process.env.NEXT_PUBLIC_URL || ""
                                    ) + `/team/${slug}`
                                }&p=${encodeURIComponent(
                                    "Lee esta publicación en SekAiJK"
                                )}`}
                                className="flex cursor-pointer justify-center p-3 group rounded-xl bg-neutral-800 hover:text-primary transition duration-150"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className="mr-2 group-hover:scale-110 md:text-xl transition duration-150"
                                />
                                Facebook
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${
                                    encodeURIComponent(
                                        process.env.NEXT_PUBLIC_URL || ""
                                    ) + `/team/${slug}`
                                }&text=${encodeURIComponent(
                                    "Lee esta publicación en SekAiJK"
                                )}`}
                                className="flex cursor-pointer justify-center p-3 group rounded-xl bg-neutral-800 hover:text-primary transition duration-150"
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="mr-2 group-hover:scale-110 md:text-xl transition duration-150"
                                />
                                Twitter
                            </a>
                        </div>
                    </section>
                </div>
            </div>
            <section>
                <h2 className="text-2xl font-semibold font-lato">
                    Publicaciones
                </h2>
                <Separator className="my-2" />
                <ListPostUser slug={slug} />
            </section>
        </article>
    );
}

export default TeamMemberPage;
