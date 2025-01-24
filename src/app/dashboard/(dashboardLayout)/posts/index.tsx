"use client";
import HeaderPage from "@/components/admin/HeaderPage";
import PostForm from "./components/Form";
import {useCreatePostMutation, useGetPostsQuery} from "@/lib/storage/Api/posts";
import {setTitulo} from "@/lib/storage/Reducers/layout.reducer";
import {Pagination} from "antd";
import {useRouter} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
import LoadingPosts from "./components/Loading";
import Card from "./components/Card";
import {useGetCategoriesQuery} from "@/lib/storage/Api/categories";
import {useTranslations} from "next-intl";

function App() {
    const t = useTranslations();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 10,
    });
    const [search, setSearch] = useState("");
    const [catQuery, setCatQuery] = useState("");
    const [sortValue, setSortValue] = useState("createdAt,asc");
    const router = useRouter();
    const dispatch = useDispatch();
    const {data, isLoading} = useGetPostsQuery({
        ...pagination,
        Search: search,
        categories: catQuery,
        sort: sortValue,
    });
    const [apiCreate] = useCreatePostMutation();
    const {data: categories} = useGetCategoriesQuery({});
    const filtres = useMemo(() => {
        return [
            {
                label: t("posts.editForm.category"),
                value: "categories",
                children: categories?.map((category: any) => ({
                    value: category.id,
                    label: category.name,
                })),
            },
        ];
    }, [categories]);

    const handleCreate = async (values: any) => {
        setLoading(true);
        return new Promise<any>((resolve, reject) => {
            apiCreate(values)
                .then((response) => {
                    if (response.error) {
                        console.log(response.error);
                        return reject(response.error);
                    }
                    console.log(response.data);
                    resolve(response.data);
                    setLoading(false);
                    setModalOpen(false);
                    router.push(`/dashboard/posts/${response.data.id}`);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    reject(err);
                });
        });
    };

    const handleSearch = (values: any) => {
        const categoriesQ: any[] = [];
        if (values.filters) {
            values.filters.forEach((filter: any) => {
                switch (filter[0]) {
                    case "categories":
                        categoriesQ.push(filter[1]);
                        break;
                    default:
                        break;
                }
            });
        }
        setCatQuery(categoriesQ.join(","));
        setSearch(values.search);
        setSortValue(values.sort);
    };

    useEffect(() => {
        dispatch(setTitulo(""));
    }, []);

    return (
        <div className="flex flex-col w-full h-full gap-5">
            <HeaderPage
                formItems={{
                    add: true,
                    search: true,
                    filter: true,
                    sort: [
                        {
                            label: t("posts.editForm.order.ascendingCreated"),
                            value: "createdAt,asc",
                        },
                        {
                            label: t("posts.editForm.order.descendingCreated"),
                            value: "createdAt,desc",
                        },
                    ],
                }}
                sortDefault={{
                    label: t("posts.editForm.order.ascendingCreated"),
                    value: "createdAt,asc",
                }}
                filters={filtres}
                onFinish={handleSearch}
                newElement={() => setModalOpen(true)}
            >
                Total elementos: {data?.count ?? 0}
            </HeaderPage>
            <PostForm
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onFinish={handleCreate}
                loading={loading}
            />
            <div className="flex-1 flex flex-col">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
                        >
                            <LoadingPosts />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {(data?.data ?? []).map((post: any) => (
                                    <Card key={post.id} post={post} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex justify-center my-4">
                    <div className="bg-body rounded-lg p-2">
                        <Pagination
                            total={data?.count ?? 1}
                            onChange={(page, limit) =>
                                setPagination({page, limit})
                            }
                            pageSizeOptions={[12, 24, 48]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
