import AxiosBaseQuery from "@/lib/store/AxiosQuery";
import {createApi} from "@reduxjs/toolkit/query/react";
import {NotificationUserType} from "../types/notifications";

interface NotificationRead {
    id: string;
    read: boolean;
}

export const notificationsApi = createApi({
    reducerPath: "notifications",
    baseQuery: AxiosBaseQuery,
    tagTypes: ["notifications"],
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationUserType[], null>({
            query: () => ({
                url: "/profile/notifications",
                method: "GET",
            }),
            providesTags: ["notifications"],
        }),
        markRead: builder.mutation({
            query: (data: NotificationRead) => ({
                url: "/profile/notifications",
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["notifications"],
        }),
        markAllRead: builder.mutation({
            query: () => ({
                url: "/profile/notifications/mark-all",
                method: "POST",
            }),
            invalidatesTags: ["notifications"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkAllReadMutation,
    useMarkReadMutation,
} = notificationsApi;
