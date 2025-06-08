import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {ResourceType, UserResource} from "../types/userResource";

export interface ResourceForm {
    name: string;
    resourceId: string;
    url: string;
    type: ResourceType;
}

export const resourceApi = createApi({
    reducerPath: "resources",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["resources", "resource"],
    endpoints: (builder) => ({
        getResources: builder.query<UserResource[], string>({
            query: () => ({
                url: `/profile/resources`,
                method: "GET",
            }),
            providesTags: ["resources"],
        }),
        uploadResource: builder.mutation({
            query: (data: ResourceForm) => ({
                url: "/profile/resources",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["resources"],
        }),
        deleteResource: builder.mutation({
            query: (id: number) => ({
                url: `/profile/resources/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["resources"],
        }),
    }),
});

export const {
    useGetResourcesQuery,
    useUploadResourceMutation,
    useDeleteResourceMutation,
} = resourceApi;
