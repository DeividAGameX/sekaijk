"use client";
import {Badge} from "@/components/ui/badge";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {useGetLastQuery, useGetRelatedQuery} from "../lib/PostPublic.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";

interface RecommendationProps {
    slug?: string;
    query?: string;
    orientation: "horizontal" | "vertical";
}

function useGetPosts(slug?: string, query?: string) {
    const {data: relatedData, isLoading: relatedLoading} = useGetRelatedQuery(
        {slug: slug ?? "", query: query},
        {skip: !slug}
    );
    const {data: lastData, isLoading: lastLoading} = useGetLastQuery(
        query ?? "",
        {skip: slug ? true : false}
    );
    return {
        posts: slug ? relatedData : lastData,
        loading: relatedLoading || lastLoading,
    };
}

function RecommendationPostLoading({
    orientation,
}: {
    orientation: "horizontal" | "vertical";
}) {
    return (
        <article
            className={`group ${
                orientation == "vertical" ? "h-56" : "h-80"
            } relative overflow-hidden rounded-xl border-2 border-neutral-800`}
        >
            <div className="w-full h-full bg-neutral-800 flex justify-center items-center">
                <FontAwesomeIcon className="text-4xl" icon={faImage} />
            </div>
            <div className="w-full h-full absolute top-0 left-0 flex items-end bg-gradient-to-t from-neutral-950 to-transparent">
                <div className="w-full pb-4 px-3">
                    <div className="w-full h-5 bg-primary rounded-xl"></div>
                    <div className="text-sm text-muted-foreground mt-1 flex justify-between items-center">
                        <div className="w-full h-3.5 bg-neutral-800"></div>
                        <div className="w-3 h-3.5 bg-primary rounded-xl"></div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function RecommendationPost({slug, query, orientation}: RecommendationProps) {
    const {posts, loading} = useGetPosts(slug, query);
    const position = {
        horizontal: "grid grid-cols-1 gap-6 md:grid-cols-3",
        vertical: "grid grid-rows-1 gap-2 md:grid-rows-3",
    };
    return (
        <div className={position[orientation]}>
            {(posts ?? Array.from({length: 3})).map((post, i) =>
                loading ? (
                    <RecommendationPostLoading
                        key={i}
                        orientation={orientation}
                    />
                ) : (
                    <article
                        key={i}
                        className={`group ${
                            orientation == "vertical" ? "h-56" : "h-80"
                        } relative overflow-hidden rounded-xl border-2 border-neutral-800`}
                    >
                        <div className="w-full h-full">
                            <Image
                                src={post.banner ?? ""}
                                alt={post.title}
                                width={920}
                                height={570}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-150"
                            />
                            <div className="absolute top-2 left-2">
                                <Badge key={i} className="bg-neutral-950">
                                    {post.Categories?.name}
                                </Badge>
                            </div>
                        </div>
                        <div className="w-full h-full absolute top-0 left-0 flex items-end bg-gradient-to-t from-neutral-950 to-transparent group-hover:from-20% transition duration-150">
                            <div className="w-full pb-4 px-3">
                                <Link
                                    href={`/${post.Categories?.slug}/${post.slug}`}
                                    className="text-xl font-semibold hover:text-primary transition duration-150"
                                >
                                    <h1>{post.title}</h1>
                                </Link>
                                <div className="text-sm text-muted-foreground mt-1 flex justify-between items-center">
                                    <p>
                                        {moment(post.createdAt).format("LL")}
                                        {" | "}
                                        por {post.author.name}
                                    </p>
                                    <Link
                                        href={`/${post.Categories?.slug}/${post.slug}`}
                                        className="hover:text-primary transition duration-150"
                                    >
                                        Ver
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            )}
        </div>
    );
}

export default RecommendationPost;
