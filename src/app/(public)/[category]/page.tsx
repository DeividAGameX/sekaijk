import {Separator} from "@/components/ui/separator";
import Categories from "@/features/categories/lib/CategoriesModel";
import ListPostCategory from "@/features/public/Categories/Components/ListPost";
import RecommendationPost from "@/features/public/components/Recomendation";
import {Metadata} from "next";
import Image from "next/image";
import {notFound} from "next/navigation";

type Props = {
    params: Promise<{category: string}>;
};

export async function generateStaticParams() {
    const categories = await Categories.findMany();
    return categories.map((c) => ({
        category: c.slug,
    }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {category} = await params;

    const categoryData = await Categories.findFirst({
        where: {slug: category},
    });

    if (!categoryData) {
        return {
            title: `Categoría no encontrada | SekAiJK`,
            description:
                "La categoría que buscas no existe o ha sido eliminada.",
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const fullUrl = `${baseUrl}/${categoryData.slug}`;
    const defaultImage = `${baseUrl}/assets/perfil.jpg`;

    return {
        title: `${categoryData.name} | SekAiJK`,
        description:
            categoryData.description ||
            `Explora contenido de la categoría ${categoryData.name} en SekAiJK.`,
        keywords: [
            "SekAiJK",
            "anime",
            "videojuegos",
            "películas",
            "cultura geek",
            categoryData.name,
        ],
        authors: [
            {
                name: "SekAiJK",
                url: fullUrl,
            },
        ],
        creator: "SekAiJK",
        publisher: "SekAiJK",
        openGraph: {
            type: "website",
            title: `${categoryData.name} | SekAiJK`,
            description:
                categoryData.description ||
                `Explora contenido sobre ${categoryData.name}.`,
            url: fullUrl,
            siteName: "SekAiJK",
            images: [
                {
                    url: defaultImage,
                    alt: `Imagen representativa de ${categoryData.name}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${categoryData.name} | SekAiJK`,
            description:
                categoryData.description ||
                `Explora contenido sobre ${categoryData.name}.`,
            images: [defaultImage],
        },
        robots: "index, follow",
    };
}

async function Category({params}: Props) {
    const {category} = await params;
    const categoryData = await Categories.findFirst({
        select: {
            name: true,
            description: true,
        },
        where: {slug: category},
    });
    if (!categoryData) {
        return notFound();
    }
    return (
        <div className="container mt-20">
            <article className="w-full h-64 overflow-hidden rounded-xl relative">
                <Image
                    className="w-full h-full object-cover"
                    src="/assets/FondoPortada.jpg"
                    alt="Categoría"
                    width={1920}
                    height={1080}
                />
                <div className="absolute w-full h-full bg-neutral-800/90 top-0 left-0 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <header>
                            <h1 className="text-white text-5xl font-bold">
                                {categoryData.name}
                            </h1>
                        </header>
                        <Separator />
                        <main className="max-w-2xl w-full text-center">
                            <p className="text-white text-sm">
                                {categoryData.description}
                            </p>
                        </main>
                    </div>
                </div>
            </article>
            <main className="mt-4">
                <ListPostCategory slug={category} />
                <div className="mb-16">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-lato font-bold uppercase">
                            Publicaciones mas recientes
                        </h1>
                    </div>
                    <Separator className="my-2" />
                    <RecommendationPost orientation="horizontal" />
                </div>
            </main>
        </div>
    );
}

export default Category;
