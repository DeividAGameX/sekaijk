import Categories from "@/features/categories/lib/CategoriesModel";
import PublicHeader from "./Header";
import PublicFooter from "./Footer";

async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await Categories.findMany();
    return (
        <div className="min-h-screen flex flex-col">
            <PublicHeader categories={categories} />
            <div className="flex-1">{children}</div>
            <PublicFooter categories={categories} />
        </div>
    );
}

export default PublicLayout;
