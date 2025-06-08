import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RolModal} from "../types/roles";

const initialState: RolModal = {
    open: false,
    id: null,
};

export const rolModalSlice = createSlice({
    name: "rolModal",
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

export const {toggleOpen, setId} = rolModalSlice.actions;

export default rolModalSlice.reducer;
