import PostCard from "@/features/posts/components/Posts/PostCard";
import {useGetAllPostsQuery} from "@/features/posts/lib/Posts.reducer";
import {Pagination} from "antd";

function PostListTab() {
    const {data: response} = useGetAllPostsQuery("");
    return (
        <div className="flex-1 h-full overflow-hidden flex flex-col gap-2">
            <div className="flex-1 overflow-auto py-2 p-0 md:px-3">
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-2 py-2">
                    {(response?.data ?? []).map((post) => (
                        <PostCard key={post.id} {...post} />
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

export default PostListTab;
