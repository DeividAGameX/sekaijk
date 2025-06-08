import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profile",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["profile"],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
            }),
            providesTags: ["profile"],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: "/profile",
                method: "PUT",
                data: body,
            }),
            invalidatesTags: ["profile"],
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: "/profile/changePassword",
                method: "PUT",
                data: body,
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
} = profileApi;
