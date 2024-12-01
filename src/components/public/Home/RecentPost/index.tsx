"use client";
import {AuthorType} from "@/types/public/Author";
import {Category} from "@/types/public/Categories";
import {TagsType} from "@/types/public/Tags";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion";

export type HomeReviewsType = {
    slug: string | null;
    title: string;
    description: string;
    banner: string | null;
    createdAt: Date;
    author: AuthorType;
    Categories: Category | null;
    Tags: TagsType[] | null;
};

function RecentPost({reviews}: {reviews: HomeReviewsType[]}) {
    return (
        <div className="p-4 bg-gradient-to-tl from-neutral-950 from-10% via-neutral-900 to-neutral-950 to-90% md:p-14">
            <div className="max-w-7xl w-full mx-auto overflow-hidden">
                <h4 className="text-lg text-neutral-600">Lo mas reciente</h4>
                <h1 className="text-5xl">Reviews recientes</h1>
                <div className="grid md:grid-cols-2 gap-10 my-10">
                    <motion.div
                        initial={{translateX: "-100%", opacity: 0}}
                        whileInView={{translateX: 0, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.75, ease: "easeOut"}}
                        className="flex-1 flex flex-col gap-2 group/item"
                    >
                        <div className="flex-1 overflow-hidden relative">
                            <Image
                                src={reviews[0].banner || ""}
                                alt={reviews[0].title}
                                className="w-full h-full object-cover transition duration-200 group-hover/item:scale-105"
                                width={1920}
                                height={1080}
                            />
                            <div className="absolute top-4 left-4 rounded-md bg-primary p-2">
                                {reviews[0].Categories?.name}
                            </div>
                        </div>
                        <div className="flex gap-2 ">
                            <div className="text-center font-bold px-4">
                                <h1 className="text-5xl border-b-[1px] border-neutral-700">
                                    {moment(reviews[0].createdAt || "").format(
                                        "DD"
                                    )}
                                </h1>
                                <h5 className="text-lg">
                                    {moment(reviews[0].createdAt || "").format(
                                        "MMM"
                                    )}
                                </h5>
                            </div>
                            <div>
                                <Link
                                    href={`/${reviews[0].Categories?.slug}/${reviews[0].slug}`}
                                    className="text-2xl font-bold transition duration-200 hover:text-primary md:text-4xl"
                                >
                                    {reviews[0].title || ""}
                                </Link>
                                <p className="line-clamp-3 text-ellipsis">
                                    {reviews[0].description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{translateX: "100%", opacity: 0}}
                        whileInView={{translateX: 0, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.75, ease: "easeOut"}}
                    >
                        {reviews.slice(1).map((review) => (
                            <div
                                key={review.slug}
                                className="mb-2 flex items-center gap-2 group/item"
                            >
                                <div className="w-40 h-40 min-w-40 overflow-hidden">
                                    <Image
                                        src={review.banner || ""}
                                        alt={review.title}
                                        className="w-full h-full object-cover cursor-pointer transition duration-200 group-hover/item:scale-105"
                                        width={1920}
                                        height={1080}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-400">
                                        {`${moment(review.createdAt).format(
                                            "LL"
                                        )}  •  `}
                                        <Link
                                            href={`/${review.Categories?.slug}`}
                                            className="text-white transition duration-150 hover:text-neutral-200"
                                        >
                                            {review.Categories?.name}
                                        </Link>
                                    </p>
                                    <Link
                                        href={`/${review.Categories?.slug}/${review.slug}`}
                                        className="font-bold line-clamp-2 text-ellipsis transition duration-150 hover:text-primary md:text-2xl"
                                    >
                                        {review.title || ""}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default RecentPost;
