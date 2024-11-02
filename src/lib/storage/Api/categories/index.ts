import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/lib/storage/Api";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["tags", "tag"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["tags"],
        }),
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
            }),
            providesTags: ["tags"],
        }),
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: "/categories",
                method: "POST",
                data: newCategory,
            }),
            invalidatesTags: ["tags"],
        }),
        updateCategory: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/categories/${id}`,
                method: "PUT",
                data: updateData,
            }),
            invalidatesTags: ["tags", "tag"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["tags"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
