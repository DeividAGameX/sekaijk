import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CreatePost, Post, PostReview, PostReviewState} from "../types/posts";

type PostData = Post & {
    author: {
        name: string;
        avatar: string;
    };
    Categories: {
        name: string;
    };
    PostsReview: [];
};

type PostReviewData = PostReview & {
    editor: {
        name: string;
        avatar: string;
    };
};

type PostReviewStateSend = PostReviewState & {
    id: string;
    postId: number;
};

interface PostsResponse {
    data: PostData[];
    count: number;
    pages: number;
}

export const postsApi = createApi({
    reducerPath: "posts",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["posts", "post", "reviews"],
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
        publishPost: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/posts/${id}/publish`,
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["posts", "post", "reviews"],
        }),
        sendToReview: builder.mutation({
            query: ({id, ...body}) => ({
                url: `/posts/${id}/review`,
                method: "POST",
                data: body,
            }),
            invalidatesTags: ["posts", "reviews"],
        }),
        getReviews: builder.query<PostReviewData[], number>({
            query: (id: number) => ({
                url: `/posts/${id}/review`,
                method: "GET",
            }),
            providesTags: ["reviews"],
        }),
        updateReview: builder.mutation<PostReview, PostReviewStateSend>({
            query: ({postId, id, ...data}) => ({
                url: `/posts/${postId}/review/${id}`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["reviews"],
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    usePublishPostMutation,
    useSendToReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation,
} = postsApi;
