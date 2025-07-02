"use client";
import {Category} from "@/features/categories/types/category";
import Link from "next/link";
import PublicDrawer from "./Drawer";
import {usePathname} from "next/navigation";

function PublicHeader({categories}: {categories: Category[]}) {
    const pathname = usePathname();
    return (
        <header className="fixed top-0 z-50 w-full transition-all duration-200 bg-neutral-950/75 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:text-primary transition-all duration-200"
                    >
                        <i className="icon-ajk text-4xl"></i>
                    </Link>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/${category.slug}`}
                                    className={`group/item text-sm uppercase font-medium ${
                                        pathname.includes(category.slug)
                                            ? "font-bold text-primary"
                                            : ""
                                    } hover:text-primary transition-all duration-200`}
                                >
                                    {category.name}
                                    <div
                                        className={`w-full h-[1px] bg-primary ${
                                            pathname.includes(category.slug)
                                                ? ""
                                                : "scale-x-0 group-hover/item:scale-100"
                                        } transition duration-200`}
                                    />
                                </Link>
                            ))}
                            <Link
                                href={`/about_us`}
                                className={`group/item text-sm uppercase font-medium ${
                                    pathname.includes("about_us")
                                        ? "font-bold text-primary"
                                        : ""
                                } hover:text-primary transition-all duration-200`}
                            >
                                Sobre nosotros
                                <div
                                    className={`w-full h-[1px] bg-primary ${
                                        pathname.includes("about_us")
                                            ? ""
                                            : "scale-x-0 group-hover/item:scale-100"
                                    } transition duration-200`}
                                />
                            </Link>
                        </nav>
                        <PublicDrawer
                            categories={categories}
                            pathname={pathname}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PublicHeader;
