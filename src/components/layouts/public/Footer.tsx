import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Category} from "@/features/categories/types/category";
import Link from "next/link";

function PublicFooter({categories}: {categories: Category[]}) {
    return (
        <footer className="bg-muted/40 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col justify-between md:flex-row mb-8">
                    <div className="md:w-96">
                        <h2 className="text-2xl font-bold mb-4">
                            GameAnime Blog
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            Blog especializado en noticias, reseñas y contenido
                            sobre videojuegos y anime. Mantente al día con las
                            últimas novedades del mundo gamer y otaku.
                        </p>
                        <div className="flex gap-2">
                            <Button asChild size="icon" variant="ghost">
                                <a
                                    href="https://youtube.com/channel/example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="h-5 w-5 bi bi-youtube" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </Button>
                            <Button asChild size="icon" variant="ghost">
                                <a
                                    href="https://twitter.com/example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="h-5 w-5 bi bi-facebook" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </Button>
                            <Button asChild size="icon" variant="ghost">
                                <a
                                    href="https://instagram.com/example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="h-5 w-5 bi bi-instagram" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </Button>
                            <Button asChild size="icon" variant="ghost">
                                <a
                                    href="https://twitch.tv/example"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="h-5 w-5 bi bi-tiktok" />
                                    <span className="sr-only">TikTok</span>
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="text-end">
                        <h3 className="font-bold mb-4">Enlaces</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Inicio
                                </Link>
                            </li>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/${category.slug}`}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} SekAiJK. Todos los derechos
                        reservados.
                    </p>
                    <div className="flex gap-4 text-sm">
                        <Link
                            href="/about_us"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Sobre nosotros
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default PublicFooter;
