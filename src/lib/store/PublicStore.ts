import {configureStore} from "@reduxjs/toolkit";
import CarouselReducer from "./features/publicPage/Carousel.reducer";
import {postApiFromCategory} from "@/features/public/Categories/lib/PostList.reducer";
import {postPublicApi} from "@/features/public/lib/PostPublic.reducer";

export const publicStore = configureStore({
    reducer: {
        carousel: CarouselReducer,
        [postApiFromCategory.reducerPath]: postApiFromCategory.reducer,
        [postPublicApi.reducerPath]: postPublicApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApiFromCategory.middleware,
            postPublicApi.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof publicStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof publicStore.dispatch;
