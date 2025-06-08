import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserProvider {
    id: number;
    name: string;
    email: string;
    avatar: string;
    banner?: string | undefined | null;
    slug?: string | undefined | null;
    rolesId: number;
    createdAt: string;
    updatedAt: string;
    Role: {
        id: number;
        name: string;
        description: string;
    };
}

const initialState: UserProvider = {
    id: 0,
    name: "",
    email: "",
    avatar: "",
    banner: "",
    slug: "",
    rolesId: 0,
    createdAt: "",
    updatedAt: "",
    Role: {
        id: 0,
        name: "",
        description: "",
    },
};

export const userSlice = createSlice({
    name: "userProvider",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProvider>) => {
            state = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
