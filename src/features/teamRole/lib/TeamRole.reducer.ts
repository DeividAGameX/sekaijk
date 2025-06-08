import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {TeamRoleForm} from "../types/teamRole";

export const teamRoleApi = createApi({
    reducerPath: "teamRoles",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["teamRoles", "teamRole"],
    endpoints: (builder) => ({
        getAllTeamRoles: builder.query({
            query: () => ({
                url: "/settings/teamRoles",
                method: "GET",
            }),
            providesTags: ["teamRoles"],
        }),
        getTeamRole: builder.query({
            query: (id: number | string) => ({
                url: `/settings/teamRoles/${id}`,
                method: "GET",
            }),
            providesTags: ["teamRole"],
        }),
        createTeamRole: builder.mutation({
            query: (data: TeamRoleForm) => ({
                url: "/settings/teamRoles",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["teamRoles"],
        }),
        updateTeamRole: builder.mutation({
            query: ({id, ...data}: {id: number | string} & TeamRoleForm) => ({
                url: `/settings/teamRoles/${id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["teamRoles", "teamRole"],
        }),
        deleteTeamRole: builder.mutation({
            query: (id: number | string) => ({
                url: `/settings/teamRoles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["teamRoles"],
        }),
    }),
});

export const {
    useGetAllTeamRolesQuery,
    useGetTeamRoleQuery,
    useCreateTeamRoleMutation,
    useUpdateTeamRoleMutation,
    useDeleteTeamRoleMutation,
} = teamRoleApi;
