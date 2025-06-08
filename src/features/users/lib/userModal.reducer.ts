import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserModal} from "../types/user";

const initialState: UserModal = {
    open: false,
    id: null,
};

export const userSlice = createSlice({
    name: "userModal",
    initialState,
    reducers: {
        toggleOpen: (state) => {
            state.open = !state.open;
        },
        setId: (state, action: PayloadAction<number | null>) => {
            state.id = action.payload;
        },
    },
});

export const {toggleOpen, setId} = userSlice.actions;

export default userSlice.reducer;
