"use client";
import {Carousel, Divider} from "antd";
import Image from "next/image";
import {motion} from "framer-motion";
import Link from "next/link";
import moment from "moment";

export type YtVideo = {
    id: number;
    title: string;
    videoId: string;
    publishedAt: Date;
    thumbnail: string;
    description: string;
};

function YTAbout({data}: {data: YtVideo[]}) {
    return (
        <div className="w-full py-8">
            <div className="max-w-7xl w-full mx-auto overflow-hidden">
                <Divider orientation="left">
                    <h1 className="text-3xl font-bold">
                        Videos mas recientes de SekAiJK
                    </h1>
                </Divider>
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
                        {data.map((n) => (
                            <div
                                className="group/item h-full cursor-pointer p-3 my-4"
                                key={n.id}
                            >
                                <div className="w-full h-52 overflow-hidden rounded-lg">
                                    <Image
                                        className="w-full h-full object-cover transition duration-150 group-hover/item:scale-105"
                                        src={n.thumbnail || ""}
                                        alt={n.title}
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-neutral-500">
                                        {moment(n.publishedAt).format("LL")}
                                    </p>
                                    <Link
                                        href={`https://www.youtube.com/watch?v=${n.videoId}`}
                                        target="_blank"
                                        className="text-2xl text-ellipsis line-clamp-1 font-semibold text-white hover:text-primary transition duration-150"
                                    >
                                        {n.title}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </motion.div>
            </div>
        </div>
    );
}

export default YTAbout;
