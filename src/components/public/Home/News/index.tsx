"use client";
import {AuthorType} from "@/types/public/Author";
import {Category} from "@/types/public/Categories";
import {TagsType} from "@/types/public/Tags";
import {Carousel} from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

export type HomeNewsType = {
    slug: string | null;
    title: string;
    banner: string | null;
    createdAt: Date;
    author: AuthorType;
    Categories: Category | null;
    Tags: TagsType[] | null;
};

function NewsPost({news}: {news: HomeNewsType[]}) {
    return (
        <div className="max-w-6xl overflow-hidden w-full mx-auto py-10">
            <h3 className="text-center text-md text-neutral-400">
                Noticias recientes
            </h3>
            <h1 className="text-center text-2xl font-bold">Noticias</h1>
            <motion.div
                initial={{translateY: "100%", opacity: 0}}
                whileInView={{translateY: 0, opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.75, ease: "easeOut"}}
            >
                <Carousel
                    autoplay
                    arrows
                    slidesPerRow={3}
                    draggable
                    infinite
                    autoplaySpeed={10000}
                    responsive={[
                        {
                            breakpoint: 800,
                            settings: {
                                slidesPerRow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true,
                            },
                        },
                    ]}
                >
                    {news.map((n) => (
                        <div
                            className="group/item h-full cursor-pointer p-3 my-4"
                            key={n.slug}
                        >
                            <div className="w-full h-52 overflow-hidden rounded-lg">
                                <Image
                                    className="w-full h-full object-cover transition duration-150 group-hover/item:scale-105"
                                    src={n.banner || ""}
                                    alt={n.title}
                                    width={1280}
                                    height={720}
                                />
                            </div>
                            <div className="p-4">
                                <Link
                                    href={`/${n.Categories?.slug}`}
                                    className="text-sm text-neutral-500 hover:text-primary"
                                >
                                    {n.Categories?.name || ""}
                                </Link>
                                <br />
                                <Link
                                    href={`/${n.Categories?.slug}/${n.slug}`}
                                    className="text-2xl text-ellipsis line-clamp-1 font-semibold text-white hover:text-primary transition duration-150"
                                >
                                    {n.title}
                                </Link>
                                <p className="text-sm text-neutral-500">
                                    {moment(n.createdAt).format("LLL")}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </motion.div>
        </div>
    );
}

export default NewsPost;
