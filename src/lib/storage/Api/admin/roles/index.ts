import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["roles", "Roles"],
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => ({
                url: "/admin/roles",
                method: "GET",
            }),
            providesTags: ["roles"],
        }),
        getRolesById: builder.query({
            query: (id) => ({
                url: `/admin/roles/${id}`,
                method: "GET",
            }),
            providesTags: ["roles"],
        }),
        createRoles: builder.mutation({
            query: (newData) => ({
                url: "/admin/roles",
                method: "POST",
                data: newData,
            }),
            invalidatesTags: ["roles"],
        }),
        updateRoles: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/admin/roles/${id}`,
                method: "PUT",
                data: updateData,
            }),
            invalidatesTags: ["roles", "Roles"],
        }),
        deleteRoles: builder.mutation({
            query: (id) => ({
                url: `/admin/roles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["roles"],
        }),
    }),
});

export const {
    useGetRolesQuery,
    useGetRolesByIdQuery,
    useCreateRolesMutation,
    useUpdateRolesMutation,
    useDeleteRolesMutation,
} = rolesApi;
