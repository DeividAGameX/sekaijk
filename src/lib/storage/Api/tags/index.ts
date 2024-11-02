import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const tagsApi = createApi({
    reducerPath: "tagsApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["tags", "tag"],
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => ({
                url: "/tags",
                method: "GET",
            }),
            providesTags: ["tags"],
        }),
        getTagById: builder.query({
            query: (id) => ({
                url: `/tags/${id}`,
                method: "GET",
            }),
            providesTags: ["tag"],
        }),
        createTag: builder.mutation({
            query: (newTag) => ({
                url: "/tags",
                method: "POST",
                data: newTag,
            }),
            invalidatesTags: ["tags"],
        }),
        updateTag: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/tags/${id}`,
                method: "PUT",
                data: updateData,
            }),
            invalidatesTags: ["tags", "tag"],
        }),
        deleteTag: builder.mutation({
            query: (id) => ({
                url: `/tags/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["tags"],
        }),
    }),
});

export const {
    useGetTagsQuery,
    useGetTagByIdQuery,
    useCreateTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation,
} = tagsApi;
