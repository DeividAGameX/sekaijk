"use client";
import {Button} from "@/components/ui/button";
import {
    nextElement,
    prevElement,
    setCurrent,
} from "@/lib/store/features/publicPage/Carousel.reducer";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import Image from "next/image";
import {RootState} from "@/lib/store/PublicStore";
import {useEffect} from "react";

interface CarouselControlProps {
    posts: {
        title: string;
        slug?: string | null;
        banner?: string | null;
        createdAt: Date;
        Categories: {
            name: string;
            slug: string;
        } | null;
    }[];
}

function CarouselControl({posts}: CarouselControlProps) {
    const {current} = useSelector((state: RootState) => state.carousel);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(nextElement());
        }, 15000);
        return () => clearTimeout(timeOut);
    }, [dispatch, current]);

    return (
        <div className="absolute w-full bottom-2 flex justify-center px-2">
            <div className="flex justify-center gap-4 items-center w-full p-2 rounded-2xl md:w-auto md:bg-neutral-950/50 md:backdrop-blur-2xl">
                <Button
                    variant={"ghost"}
                    onClick={() => dispatch(prevElement())}
                    className="h-full hover:text-primary"
                >
                    {"<"}
                </Button>
                <div className="hidden items-center gap-4 md:flex">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            animate={
                                current === index
                                    ? {
                                          opacity: 1,
                                          scale: 1,
                                          width: "96px",
                                      }
                                    : {opacity: 0.8, scale: 0.8, width: "auto"}
                            }
                            whileHover={{
                                scale: 1,
                                color: " var(--color-primary)",
                            }}
                            className="cursor-pointer overflow-hidden flex gap-2 items-center"
                            onClick={() => dispatch(setCurrent(index))}
                        >
                            <Image
                                src={post.banner ?? ""}
                                alt={post.title}
                                className={`w-24 h-24 object-cover ${
                                    current === index
                                        ? "border-2 border-primary"
                                        : ""
                                } rounded-xl transition duration-200`}
                                width={150}
                                height={150}
                            />
                            <div className="text-ellipsis w-32 hidden lg:line-clamp-2">
                                <h2>{post.title}</h2>
                                <p>{post.Categories?.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex items-center gap-2 md:hidden">
                    {posts.map((_, index) => (
                        <div
                            key={index}
                            className="w-2 h-2 rounded-full bg-neutral-50"
                            onClick={() => dispatch(setCurrent(index))}
                        >
                            {current === index && (
                                <motion.div
                                    id={"isCurrent"}
                                    layoutId="isCurrent"
                                    className="w-full h-full bg-primary rounded-full"
                                ></motion.div>
                            )}
                        </div>
                    ))}
                </div>
                <Button
                    variant={"ghost"}
                    onClick={() => dispatch(nextElement())}
                    className="h-full hover:text-primary"
                >
                    {">"}
                </Button>
            </div>
        </div>
    );
}

export default CarouselControl;
