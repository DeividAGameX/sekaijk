import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "@/lib/storage/Api/posts";
import {categoriesApi} from "@/lib/storage/Api/categories";
import {tagsApi} from "@/lib/storage/Api/tags";
import layoutReducer from "@/lib/storage/Reducers/layout.reducer";
import {userApi} from "./Api/admin/users";
import {rolesApi} from "./Api/admin/roles";
import {profileApi} from "./Api/profile";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        layout: layoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postsApi.middleware,
            categoriesApi.middleware,
            tagsApi.middleware,
            userApi.middleware,
            rolesApi.middleware,
            profileApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
