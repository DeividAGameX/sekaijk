"use client";
import {AuthorType} from "@/types/public/Author";
import {Category} from "@/types/public/Categories";
import {TagsType} from "@/types/public/Tags";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Divider} from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

export type HomeInteresType = {
    slug: string | null;
    title: string;
    description: string;
    banner: string | null;
    createdAt: Date;
    author: AuthorType;
    Categories: Category | null;
    Tags: TagsType[] | null;
};
function DeInteres({interes}: {interes: HomeInteresType[]}) {
    return (
        <div className="w-full py-20">
            <div className="max-w-[1480px] w-full mx-auto overflow-hidden">
                <h1 className="text-5xl font-bold text-center">De interés</h1>
                <Divider>
                    <h2 className="text-2xl text-neutral-700">
                        También te puede interesar
                    </h2>
                </Divider>
                <div className="grid gap-6 grid-cols-1 p-4 md:grid-cols-2">
                    {interes.map((de, index) => (
                        <motion.div
                            key={de.title}
                            initial={
                                index % 2
                                    ? {translateX: "100%", opacity: 0}
                                    : {translateX: "-100%", opacity: 0}
                            }
                            whileInView={{translateX: 0, opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 0.75, ease: "easeOut"}}
                            className="flex h-[368px] items-center bg-body group/item md:h-72"
                        >
                            <div className="flex-1 w-full h-full md:overflow-hidden">
                                <Image
                                    key={de.slug || ""}
                                    src={de.banner || ""}
                                    alt={de.title || ""}
                                    width={1280}
                                    height={720}
                                    className="w-full h-full object-cover transition duration-200 scale-[1.02] md:scale-100 group-hover/item:scale-105"
                                />
                            </div>
                            <div className="flex-1 py-10 px-5 md:p-10">
                                <p className="text-sm text-neutral-600">
                                    {`${de.author?.name}   •   ${moment(
                                        de.createdAt
                                    ).format("LL")}`}
                                </p>
                                <h1 className="text-2xl font-bold cursor-pointer transition duration-200 hover:text-primary">
                                    {de.title || ""}
                                </h1>
                                <p className="text-neutral-500 md:h-[72px] line-clamp-3 text-ellipsis">
                                    {de.description}
                                </p>
                                <Link
                                    href={`/${de.Categories?.slug}/${de.slug}`}
                                    className="text-sm font-bold transition duration-200 hover:text-primary"
                                >
                                    <Button
                                        className="my-2"
                                        type="primary"
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                            />
                                        }
                                        iconPosition="end"
                                    >
                                        Ver más
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeInteres;
