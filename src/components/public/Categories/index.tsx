"use client";

import useFetcher from "@/hooks/useFetcher";
import {PostType} from "@/types/public/Post";
import {faBoxOpen, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Divider, Input, Pagination, Result, Spin} from "antd";
import {AnimatePresence, motion} from "framer-motion";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

function ListCategories({slug}: {slug: string}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const {data, error, loading} = useFetcher<{
        posts: PostType[];
        count: number;
    }>(`/api/v1/categories/${slug}?search=${search}&page=${currentPage}`, [
        slug,
        search,
        currentPage,
    ]);

    const handledSearch = (s: string) => {
        setSearch(s);
        setCurrentPage(0);
    };

    return (
        <div className="w-full p-6 relative">
            <div className="w-full p-4 bg-neutral-900">
                <Divider orientation="left">
                    <h2 className="text-2xl font-bold">Buscar categoría</h2>
                </Divider>
                <Input.Search
                    className="my-4"
                    placeholder="Buscar una publicación por su titulo, descripción o autor"
                    onSearch={handledSearch}
                />
            </div>
            <Divider>
                <h2 className="text-2xl text-neutral-700">
                    Resultados {`"${data?.count || 0}"`}
                </h2>
            </Divider>
            <div className="relative my-4 w-full min-h-52 grid gap-6 grid-cols-1 lg:grid-cols-2">
                {!loading && (
                    <>
                        {error && (
                            <Result status="error" title="Algo salio mal :c" />
                        )}
                        {data &&
                            (data.posts.length == 0 ? (
                                <Result
                                    icon={<FontAwesomeIcon icon={faBoxOpen} />}
                                />
                            ) : (
                                (data.posts || []).map((post, index) => (
                                    <motion.article
                                        key={index}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="w-full"
                                    >
                                        <Link
                                            href={`/${slug}/${post.slug}`}
                                            title={post.title}
                                            className="overflow-hidden text-ellipsis"
                                        >
                                            <figure className="w-full h-60 rounded-lg overflow-hidden group/item">
                                                <Image
                                                    src={post.banner || ""}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition duration-200 group-hover/item:scale-105"
                                                    width={920}
                                                    height={560}
                                                />
                                            </figure>
                                            <h1 className="text-2xl line-clamp-1 text-ellipsis font-bold p-1 transition duration-200 hover:text-primary">
                                                {post.title}
                                            </h1>
                                        </Link>
                                        <section>
                                            <p className="line-clamp-2 text-ellipsis my-2 text-neutral-400">
                                                {post.description}
                                            </p>
                                            <p className="text-sm text-neutral-500 overflow-hidden text-ellipsis">
                                                <Link
                                                    href={`/team/${post.author?.slug}`}
                                                    className="text-ellipsis transition duration-200 hover:text-primary"
                                                >
                                                    {post.author?.name}
                                                </Link>
                                                {` | ${moment(
                                                    post.createdAt
                                                ).format("LL")}`}
                                            </p>
                                        </section>
                                    </motion.article>
                                ))
                            ))}
                    </>
                )}
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            className="absolute bg-primary w-full h-full top-0 left-0 flex justify-center items-center"
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <Spin
                                size="large"
                                indicator={
                                    <FontAwesomeIcon
                                        className="animate-spin"
                                        icon={faSpinner}
                                    />
                                }
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    defaultCurrent={1}
                    onChange={(e) => setCurrentPage(e - 1)}
                    total={data?.count || 0}
                    pageSizeOptions={[10]}
                />
            </div>
        </div>
    );
}

export default ListCategories;
