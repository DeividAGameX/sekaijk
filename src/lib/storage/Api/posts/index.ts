import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["posts", "post", "postImg"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (params?: any) => ({
                url: `/posts`,
                method: "GET",
                params,
            }),
            providesTags: ["posts"],
        }),
        getPostById: builder.query({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "GET",
            }),
            providesTags: ["post"],
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: "/posts",
                method: "POST",
                data: newPost,
            }),
            invalidatesTags: ["posts"],
        }),
        savePost: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/posts/${id}/save`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["post"],
        }),
        publishPost: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/posts/${id}/publish`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["post"],
        }),
        updatePost: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/posts/${id}`,
                method: "PUT",
                data: updateData,
            }),
            invalidatesTags: ["posts"],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["posts"],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useSavePostMutation,
    usePublishPostMutation,
    useDeletePostMutation,
} = postsApi;
