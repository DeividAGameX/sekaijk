import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["users", "user", "userResource"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
            providesTags: ["users"],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "GET",
            }),
            providesTags: ["users"],
        }),
        createUser: builder.mutation({
            query: (newCategory) => ({
                url: "/admin/users",
                method: "POST",
                data: newCategory,
            }),
            invalidatesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/admin/users/${id}`,
                method: "PUT",
                data: updateData,
            }),
            invalidatesTags: ["users", "user"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
        getUserImgById: builder.query({
            query: () => ({
                url: `/admin/users/imgs`,
                method: "GET",
            }),
            providesTags: ["userResource"],
        }),
        createImgUser: builder.mutation({
            query: (imgInfo) => ({
                url: `/admin/users/imgs`,
                method: "POST",
                data: imgInfo,
            }),
            invalidatesTags: ["userResource"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserImgByIdQuery,
    useCreateImgUserMutation,
} = userApi;
