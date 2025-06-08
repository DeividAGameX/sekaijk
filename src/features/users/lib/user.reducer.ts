import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {UserForm} from "../types/user";

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["users", "user"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/settings/users",
                method: "GET",
            }),
            providesTags: ["users"],
        }),
        getUser: builder.query({
            query: (id: number | string) => ({
                url: `/settings/users/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        createUser: builder.mutation({
            query: (data: UserForm) => ({
                url: "/settings/users",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: ({id, ...data}: {id: number | string} & UserForm) => ({
                url: `/settings/users/${id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["users", "user"],
        }),
        deleteUser: builder.mutation({
            query: (id: number | string) => ({
                url: `/settings/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;
