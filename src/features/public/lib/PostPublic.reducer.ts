import AxiosBaseQuery from "@/lib/store/AxiosQueryPublic";
import {createApi} from "@reduxjs/toolkit/query/react";

interface PostData {
    id: number;
    title: string;
    banner?: string | null;
    description: string;
    slug?: string | null;
    createdAt: Date;
    Categories: {
        name: string;
        slug: string;
    } | null;
    author: {
        name: string;
        avatar: string;
    };
}

interface PostsResponse {
    data: PostData[];
    count: number;
    pages: number;
}

export const postPublicApi = createApi({
    reducerPath: "postPublic",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["postPublic"],
    endpoints: (builder) => ({
        getLast: builder.query<PostData[], string>({
            query: (q) => ({
                url: `/posts/last?${q}`,
                method: "GET",
            }),
            providesTags: ["postPublic"],
        }),
        getRelated: builder.query<PostData[], {slug: string; query?: string}>({
            query: ({slug, query}) => ({
                url: `/posts/related/${slug}?${query}`,
                method: "GET",
            }),
            providesTags: ["postPublic"],
        }),
        getUserPost: builder.query<
            PostsResponse,
            {slug: string; query?: string}
        >({
            query: ({slug, query}) => ({
                url: `/posts/${slug}?${query}`,
                method: "GET",
            }),
            providesTags: ["postPublic"],
        }),
    }),
});

export const {useGetLastQuery, useGetRelatedQuery, useGetUserPostQuery} =
    postPublicApi;
