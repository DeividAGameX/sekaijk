import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {RoleForm} from "../types/roles";

export const rolesApi = createApi({
    reducerPath: "roles",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["roles", "rol"],
    endpoints: (builder) => ({
        getAllRoles: builder.query({
            query: () => ({
                url: "/settings/roles",
                method: "GET",
            }),
            providesTags: ["roles"],
        }),
        getRol: builder.query({
            query: (id: number | string) => ({
                url: `/settings/roles/${id}`,
                method: "GET",
            }),
            providesTags: ["rol"],
        }),
        createRol: builder.mutation({
            query: (data: RoleForm) => ({
                url: "/settings/roles",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["roles"],
        }),
        updateRol: builder.mutation({
            query: ({id, ...data}: {id: number | string} & RoleForm) => ({
                url: `/settings/roles/${id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["roles", "rol"],
        }),
        deleteRol: builder.mutation({
            query: (id: number | string) => ({
                url: `/settings/roles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["roles", "rol"],
        }),
    }),
});

export const {
    useGetAllRolesQuery,
    useGetRolQuery,
    useCreateRolMutation,
    useUpdateRolMutation,
    useDeleteRolMutation,
} = rolesApi;
