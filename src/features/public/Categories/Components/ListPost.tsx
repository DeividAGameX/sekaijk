"use client";
import {useState} from "react";
import PostCard from "../../components/PostCard";
import PostCardSkeleton from "../../components/PostCardSqueleton";
import {PaginationComponent} from "../../components/PostPagination";
import {useGetAllPostsQuery} from "../lib/PostList.reducer";
import {AnimatePresence} from "framer-motion";
import SearchBar from "../../components/SearchBar";

interface ListPostProps {
    slug: string;
}

interface InputType {
    order: string;
    search?: string;
}

function ListPostCategory({slug}: ListPostProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState<InputType>({
        order: "createdAt:desc",
    });
    const {data: response, isLoading} = useGetAllPostsQuery({
        slug,
        q: `page=${currentPage}&limit=12&order=${query.order}${
            query.search ? `&search=${query.search}` : " "
        }`,
    });
    const handleSubmit = (data: InputType) => {
        setQuery(data);
    };
    return (
        <AnimatePresence>
            <div className="w-full mb-10">
                <SearchBar count={response?.count ?? 0} apply={handleSubmit} />
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading
                        ? Array.from({length: 4}).map((_, index) => (
                              <PostCardSkeleton key={index} index={index} />
                          ))
                        : (response?.data ?? []).map((post) => (
                              <PostCard key={post.slug} {...post} />
                          ))}
                </div>
                <PaginationComponent
                    currentPage={currentPage + 1}
                    count={response?.count ?? 0}
                    pages={12}
                    onPageChange={(p) => setCurrentPage(p)}
                />
            </div>
        </AnimatePresence>
    );
}

export default ListPostCategory;
