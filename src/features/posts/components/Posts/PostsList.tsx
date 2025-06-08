"use client";
import {Pagination} from "antd";
import {useGetAllPostsQuery} from "../../lib/Posts.reducer";
import PostCard from "./PostCard";

interface PostListProps {
    canEdit: boolean;
    canDelete: boolean;
}

function PostList(
    {canEdit, canDelete}: PostListProps = {
        canEdit: false,
        canDelete: false,
    }
) {
    const {data: response} = useGetAllPostsQuery("");
    return (
        <div className="flex-1 overflow-hidden flex flex-col gap-2">
            <div className="flex-1 overflow-auto py-2 px-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 py-2">
                    {(response?.data ?? []).map((post) => (
                        <PostCard
                            key={post.id}
                            {...post}
                            permissions={{
                                canEdit: canEdit,
                                canDelete: canDelete,
                            }}
                        />
                    ))}
                </div>
            </div>
            <Pagination
                align="center"
                current={response?.count}
                total={response?.pages ?? 0}
            />
        </div>
    );
}

export default PostList;
