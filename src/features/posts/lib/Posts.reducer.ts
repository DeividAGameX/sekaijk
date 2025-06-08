import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CreatePost, Post} from "../types/posts";

type PostData = Post & {
    author: {
        name: string;
        avatar: string;
    };
    Categories: {
        name: string;
    };
};

interface PostsResponse {
    data: PostData[];
    count: number;
    pages: number;
}

export const postsApi = createApi({
    reducerPath: "posts",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["posts", "post"],
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsResponse, string>({
            query: (q: string) => ({
                url: `/posts?${q}`,
                method: "GET",
            }),
            providesTags: ["posts"],
        }),
        getPost: builder.query({
            query: (id: number | string) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
            providesTags: ["post"],
        }),
        createPost: builder.mutation({
            query: (post: CreatePost) => ({
                url: "/posts",
                method: "POST",
                data: post,
            }),
            invalidatesTags: ["posts"],
        }),
        updatePost: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/posts/${id}`,
                method: "PUT",
                data: body,
            }),
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
} = postsApi;
