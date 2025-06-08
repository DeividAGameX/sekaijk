import {configureStore} from "@reduxjs/toolkit";
import siderBarReducer from "@/lib/store/features/layout/Sider.reducer";
import navBarReducer from "@/lib/store/features/layout/Navbar.reducer";
import categoryReducer from "@/features/categories/lib/CategoryModal.reducer";
import tagReducer from "@/features/tags/lib/TagModal.reducer";
import userReducer from "@/lib/store/features/User.reducer";
import postReducer from "@/features/posts/lib/PostsStore.reducer";
import TeamRoleModal from "@/features/teamRole/lib/TeamRoleModal.reducer";
import UserModal from "@/features/users/lib/userModal.reducer";
import RolModal from "@/features/roles/lib/RolModal.reducer";
import {categoriesApi} from "@/features/categories/lib/Categories.reducer";
import {tagsApi} from "@/features/tags/lib/Tags.reducer";
import {postsApi} from "@/features/posts/lib/Posts.reducer";
import {resourceApi} from "@/features/users/lib/resources.reducer";
import {teamRoleApi} from "@/features/teamRole/lib/TeamRole.reducer";
import {usersApi} from "@/features/users/lib/user.reducer";
import {rolesApi} from "@/features/roles/lib/Roles.reducer";
import {profileApi} from "@/features/profile/lib/Profile.reducer";

export const store = configureStore({
    reducer: {
        //Reducer
        sideBar: siderBarReducer,
        navBar: navBarReducer,
        categoryModel: categoryReducer,
        tagModal: tagReducer,
        userProvider: userReducer,
        postProvider: postReducer,
        teamRoleModal: TeamRoleModal,
        userModal: UserModal,
        roleModal: RolModal,
        // API
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [tagsApi.reducerPath]: tagsApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [resourceApi.reducerPath]: resourceApi.reducer,
        [teamRoleApi.reducerPath]: teamRoleApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoriesApi.middleware,
            tagsApi.middleware,
            postsApi.middleware,
            resourceApi.middleware,
            teamRoleApi.middleware,
            usersApi.middleware,
            rolesApi.middleware,
            profileApi.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
