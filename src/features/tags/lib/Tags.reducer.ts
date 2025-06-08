import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {TagForm} from "../types/tag";

export const tagsApi = createApi({
    reducerPath: "tags",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["tags", "tag"],
    endpoints: (builder) => ({
        getAllTags: builder.query({
            query: () => ({
                url: "/tags",
                method: "GET",
            }),
            providesTags: ["tags"],
        }),
        getTag: builder.query({
            query: (id: number | string) => ({
                url: `/tags/${id}`,
                method: "GET",
            }),
            providesTags: ["tag"],
        }),
        createTag: builder.mutation({
            query: (data: TagForm) => ({
                url: "/tags",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["tags"],
        }),
        updateTag: builder.mutation({
            query: ({id, ...data}: {id: number | string} & TagForm) => ({
                url: `/tags/${id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["tags", "tag"],
        }),
        deleteTag: builder.mutation({
            query: (id: number | string) => ({
                url: `/tags/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["tags"],
        }),
    }),
});

export const {
    useGetAllTagsQuery,
    useGetTagQuery,
    useCreateTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation,
} = tagsApi;
