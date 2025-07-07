import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {ResourceType} from "../types/userResource";

interface ResourceForm {
    name: string;
    url: string;
    type: ResourceType;
    resourceId: string;
    usersFoldersId: string | null;
    typeForm: "RESOURCE";
}

interface FolderProps {
    name: string;
    parentId: string | null;
    typeForm: "FOLDER";
}

interface Resource {
    id: number;
    name: string;
    url: string;
    resourceId: string;
    type: ResourceType;
}

interface ResourceFolder {
    id: string;
    name: string;
}

interface UserResource {
    id: string;
    name: string;
    parentId: string | null;
    Resources: Resource[];
    children: ResourceFolder[];
}

export const resourceApi = createApi({
    reducerPath: "resources",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["resources", "resource"],
    endpoints: (builder) => ({
        getResources: builder.query<UserResource, string>({
            query: (query) => ({
                url: `/profile/resources?${query}`,
                method: "GET",
            }),
            providesTags: ["resources"],
        }),
        uploadResource: builder.mutation({
            query: (data: ResourceForm | FolderProps) => ({
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
        deleteFolder: builder.mutation({
            query: (id: string) => ({
                url: `/profile/resources/folder/${id}`,
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
    useDeleteFolderMutation,
} = resourceApi;
