"use client";
import {Category} from "@/types/public/Categories";
import Link from "next/link";
import {useState} from "react";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {Button, Drawer} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";

function ItemNav({item}: {item: Category}) {
    const [isOver, setIsOver] = useState(false);
    return (
        <li
            className="relative transition duration-150 hover:text-primary"
            onMouseOver={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            <Link
                href={`/${item.slug}`}
                className="text-sm font-bold transition duration-150 hover:text-primary"
            >
                {item.name}
            </Link>
            {isOver && (
                <motion.div
                    className=" h-[2px] absolute bottom-0 bg-[--primary]"
                    initial={{width: 0}}
                    animate={{width: "100%"}}
                    exit={{width: 0}}
                    transition={{duration: 0.15}}
                />
            )}
        </li>
    );
}

function AboutUsLink() {
    const [isOver, setIsOver] = useState(false);
    const t = useTranslations("public.header");
    return (
        <li
            className="relative"
            onMouseOver={() => setIsOver(true)}
            onMouseLeave={() => setIsOver(false)}
        >
            <Link
                href={`/aboutUs`}
                className="text-sm font-bold transition duration-150 hover:text-primary"
            >
                {t("aboutUs")}
            </Link>
            {isOver && (
                <motion.div
                    className=" h-[2px] absolute bottom-0 bg-[--primary]"
                    initial={{width: 0}}
                    animate={{width: "100%"}}
                    exit={{width: 0}}
                    transition={{duration: 0.15}}
                />
            )}
        </li>
    );
}

function HeaderPage({categories}: {categories: Category[]}) {
    const [drawerCollapsed, setDrawerCollapsed] = useState(false);
    return (
        <nav className="w-full h-16 bg-body fixed z-10">
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between h-full px-4">
                <Link href="/" className="text-5xl hover:text-primary">
                    <i className="icon-navbar"></i>
                </Link>
                <ul className="hidden gap-4 font-lato md:flex">
                    {categories?.map((category) => (
                        <ItemNav key={category.id} item={category} />
                    ))}
                    <AboutUsLink />
                </ul>
                <div className="md:hidden">
                    <Button
                        type="text"
                        onClick={() => setDrawerCollapsed(true)}
                        icon={<FontAwesomeIcon icon={faBars} />}
                    />
                </div>
            </div>
            <Drawer
                className="publicDrawer"
                title="SekAiJK"
                open={drawerCollapsed}
                onClose={() => setDrawerCollapsed(false)}
                placement="left"
                width={"100%"}
                classNames={{
                    body: "relative",
                }}
            >
                <div className="flex flex-col pt-5 gap-2 justify-center items-center">
                    <i className="icon-navbar text-7xl"></i>
                </div>
                <div className="mx-4 w-auto h-[2px] my-4 bg-neutral-800"></div>
                <h3 className="text-2xl text-center">Categorías</h3>
                <div className="mx-4 w-auto h-[2px] my-4 bg-neutral-800"></div>
                <ul className="font-lato">
                    {categories?.map((category) => (
                        <li
                            key={category.id}
                            className="relative my-2 text-xl text-center text-white transition duration-150 hover:text-primary"
                        >
                            <Link
                                href={`/${category.slug}`}
                                className="transition duration-150 hover:text-primary"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                    <li className="relative">
                        <Link
                            href={`/aboutUs`}
                            className="text-center text-xl transition duration-150 hover:text-primary"
                        >
                            <p>Sobre nosotros</p>
                        </Link>
                    </li>
                </ul>
                <div className="mx-4 w-auto h-[2px] my-4 bg-neutral-800"></div>
                <div className="w-full absolute bottom-2 left-0">
                    <h1 className="text-lg font-bold text-center">
                        Redes sociales
                    </h1>
                    <div className="flex justify-center">
                        <a
                            key="fb"
                            href="https://www.facebook.com/sekaijkoficial/"
                            className="rounded-md w-10 h-10 flex justify-center items-center text-lg hover:bg-fb hover:scale-110 transition"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a
                            key="ig"
                            href="https://www.instagram.com/sekai.j.k/"
                            className="rounded-md w-10 h-10 flex justify-center items-center text-lg hover:bg-ig hover:scale-110 transition"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a
                            key="tt"
                            href="https://www.tiktok.com/@sekaijk"
                            className="rounded-md w-10 h-10 flex justify-center items-center text-lg hover:bg-tt hover:scale-110 transition"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faTiktok} />
                        </a>
                    </div>
                </div>
            </Drawer>
        </nav>
    );
}

export default HeaderPage;
