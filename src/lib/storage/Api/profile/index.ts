import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["profile"],
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/profile",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["profile"],
        }),
        getMyPost: builder.query({
            query: () => ({
                url: `/profile/posts`,
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        addSocial: builder.mutation({
            query: (data) => ({
                url: `/profile/social`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["profile"],
        }),
        deleteSocial: builder.mutation({
            query: (id) => ({
                url: `/profile/social/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["profile"],
        }),
    }),
});

export const {
    useProfileQuery,
    useUpdateProfileMutation,
    useGetMyPostQuery,
    useAddSocialMutation,
    useDeleteSocialMutation,
} = profileApi;
