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

export const postApiFromCategory = createApi({
    reducerPath: "posts",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["posts"],
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostsResponse, {slug: string; q: string}>({
            query: ({slug, q}) => ({
                url: `/categories/${slug}?${q}`,
                method: "GET",
            }),
            providesTags: ["posts"],
        }),
    }),
});

export const {useGetAllPostsQuery} = postApiFromCategory;
