import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {CategoryForm} from "../types/category";

export const categoriesApi = createApi({
    reducerPath: "categories",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["categories", "category"],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["categories"],
        }),
        getCategory: builder.query({
            query: (id: number | string) => ({
                url: `/categories/${id}`,
                method: "GET",
            }),
            providesTags: ["category"],
        }),
        createCategory: builder.mutation({
            query: (data: CategoryForm) => ({
                url: "/categories",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["categories"],
        }),
        updateCategory: builder.mutation({
            query: ({id, ...data}: {id: number | string} & CategoryForm) => ({
                url: `/categories/${id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: ["categories", "category"],
        }),
        deleteCategory: builder.mutation({
            query: (id: number | string) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories", "category"],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
