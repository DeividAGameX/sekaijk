"use client";
import {AuthorType} from "@/types/public/Author";
import {Category} from "@/types/public/Categories";
import {TagsType} from "@/types/public/Tags";
import {Button} from "antd";
import moment from "moment";
import {useEffect, useMemo, useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type HomeCarouselType = {
    slug: string | null;
    title: string;
    banner: string | null;
    createdAt: Date;
    author: AuthorType;
    Categories: Category | null;
    Tags: TagsType[] | null;
};

function HomeCarousel({items}: {items: HomeCarouselType[]}) {
    const [index, setIndex] = useState(0);
    const [timer, setTimer] = useState<any>();
    const item = useMemo(() => {
        return items[index];
    }, [index]);

    const handlePrev = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(items.length - 1);
        }
    };

    const handleNext = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        if (index + 1 < items.length) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    const handleChange = (i: number) => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        setIndex(i);
    };

    useEffect(() => {
        if (timer) {
            const timeOut = setTimeout(() => {
                if (index + 1 < items.length) {
                    setIndex(index + 1);
                } else {
                    setIndex(0);
                }
            }, 10000);
            setTimer(timeOut);
            return () => clearTimeout(timeOut);
        } else {
            return () => clearTimeout(timer);
        }
    }, [index]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (index + 1 < items.length) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }, 10000);
        setTimer(timeOut);
        return () => clearTimeout(timeOut);
    }, []);

    return (
        <div className="relative">
            <div className="w-full h-screen overflow-hidden">
                <motion.img
                    key={index}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.75, ease: "easeOut"}}
                    className="w-full h-full object-cover"
                    src={item.banner || ""}
                />
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="bg-primary-op-2 w-full h-full flex items-center">
                        <div className="max-w-[1580px] w-full mx-auto">
                            <div className="overflow-hidden">
                                <motion.span
                                    key={`category-${index}`}
                                    className="bg-primary text-xs p-2 rounded-md"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Link
                                        href={`/${item.Categories?.slug}`}
                                        className="transition duration-200 hover:text-primary"
                                    >
                                        {item.Categories?.name}
                                    </Link>
                                </motion.span>
                            </div>
                            <div className="text-6xl overflow-hidden max-w-[800px] tracking-tight uppercase font-bold font-lato my-2">
                                <Link
                                    href={`/${item.Categories?.slug}/${item.slug}`}
                                    className="hover:text-primary transition duration-200"
                                >
                                    <motion.h1
                                        key={`title-${index}`}
                                        initial={{translateY: "100%"}}
                                        animate={{translateY: 0}}
                                        exit={{translateY: -200}}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {item.title}
                                    </motion.h1>
                                </Link>
                            </div>
                            <div className="max-w-[600px] overflow-hidden flex gap-2">
                                <motion.p
                                    key={`createdAt-${index}`}
                                    initial={{translateY: "100%"}}
                                    animate={{translateY: 0}}
                                    exit={{translateY: -200}}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    {moment(item.createdAt).format("LLL")}
                                </motion.p>
                                <motion.p
                                    key={`dot-${index}`}
                                    initial={{translateY: "100%"}}
                                    animate={{translateY: 0}}
                                    exit={{translateY: -200}}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                        delay: 0.08,
                                    }}
                                >
                                    {"  "}•{"  "}
                                </motion.p>
                                <motion.p
                                    key={`author-${index}`}
                                    initial={{translateY: "100%"}}
                                    animate={{translateY: 0}}
                                    exit={{translateY: -200}}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                        delay: 0.09,
                                    }}
                                >
                                    <Link
                                        href={`/${item.author.slug}`}
                                        className="transition duration-200 hover:text-primary hover:font-bold"
                                    >
                                        {item.author?.name}
                                    </Link>
                                </motion.p>
                            </div>
                            <div className="w-full flex justify-center md:hidden">
                                <Button type="text" onClick={handlePrev}>
                                    {"<"}
                                </Button>
                                <Button type="text" onClick={handleNext}>
                                    {">"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-12 w-full">
                    <div className="hidden max-w-6xl w-full mx-auto md:grid gap-2 grid-cols-3">
                        {items.map((ca, i) => (
                            <motion.div
                                key={"dot-" + i}
                                className={`${
                                    i == index
                                        ? "bg-neutral-800/60"
                                        : "bg-neutral-950/85"
                                } p-3 flex items-center gap-2 cursor-pointer backdrop-blur-md`}
                                onClick={() => handleChange(i)}
                                animate={
                                    i == index
                                        ? {
                                              scale: 1.02,
                                          }
                                        : {
                                              scale: 1,
                                          }
                                }
                            >
                                <div className="w-24 h-full">
                                    <Image
                                        src={ca.banner || ""}
                                        alt={ca.title}
                                        width={1280}
                                        height={720}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {moment(ca.createdAt).format("LL")}
                                    </div>
                                    <b className="text-xl">{ca.title}</b>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="max-w-xs w-full mx-auto flex gap-3 justify-center md:hidden">
                        {items.map((ca, i) => (
                            <motion.div
                                key={"dot-col-" + i}
                                className={`${
                                    i == index
                                        ? "bg-[--primary]"
                                        : "bg-neutral-950"
                                } w-4 h-4 rounded-full flex items-center gap-2 cursor-pointer`}
                                onClick={() => handleChange(i)}
                                animate={
                                    i == index
                                        ? {
                                              scale: 1.02,
                                          }
                                        : {
                                              scale: 1,
                                          }
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 h-full hidden items-center md:flex">
                <Button type="text" onClick={handlePrev}>
                    {"<"}
                </Button>
            </div>
            <div className="absolute top-0 right-0 h-full hidden items-center md:flex">
                <Button type="text" onClick={handleNext}>
                    {">"}
                </Button>
            </div>
        </div>
    );
}

export default HomeCarousel;
