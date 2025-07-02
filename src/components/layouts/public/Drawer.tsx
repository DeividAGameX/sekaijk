import {Category} from "@/features/categories/types/category";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faClose} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/ui/button";
import usePublicDrawer from "@/hooks/usePublicDrawer";

function PublicDrawer({
    categories,
    pathname,
}: {
    categories: Category[];
    pathname: string;
}) {
    const {state: open, toggle} = usePublicDrawer();
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggle}
            >
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed top-0 right-0 w-full h-screen z-50 bg-black/50"
                        transition={{duration: 0.1, ease: "easeIn"}}
                    >
                        <div className="w-full h-full overflow-hidden relative flex justify-end">
                            <motion.div
                                initial={{translateX: "100vw"}}
                                animate={{translateX: 0}}
                                exit={{translateX: "100vw"}}
                                className="h-full w-[300px] flex flex-col sm:w-[400px] bg-background px-4 py-2"
                                transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <div className="border-b-[1px] border-b-neutral-800 flex justify-between items-center py-4">
                                    <h2 className="text-4xl font-bold">
                                        SekAiJK
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        onClick={toggle}
                                        className="text-white text-2xl"
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </Button>
                                </div>
                                <nav className="flex-1 flex flex-col gap-2 text-lg mt-3">
                                    <Link
                                        href="/"
                                        className={`px-2 py-1 rounded-md hover:bg-accent ${
                                            pathname === "/"
                                                ? "font-bold text-primary"
                                                : ""
                                        }`}
                                    >
                                        Inicio
                                    </Link>
                                    {categories.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/${item.slug}`}
                                            className={`px-2 py-1 rounded-md hover:bg-accent ${
                                                pathname.includes(item.slug)
                                                    ? "font-bold text-primary"
                                                    : ""
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="border-t-[1px] border-t-neutral-800 py-4 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold">Síguenos</h4>
                                        <span className="flex gap-4 mt-2">
                                            <a
                                                href="https://www.youtube.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-youtube"></i>
                                            </a>
                                            <a
                                                href="https://www.facebook.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                            <a
                                                href="https://www.instagram.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-instagram"></i>
                                            </a>
                                            <a
                                                href="https://www.tiktok.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="bi bi-tiktok"></i>
                                            </a>
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <Link
                                            href="/about_us"
                                            className="w-full px-3 py-2 rounded-md bg-primary text-center"
                                        >
                                            Sobre nosotros
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default PublicDrawer;
