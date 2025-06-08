import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TagModal {
    open: boolean;
    id: number | null;
}

const initialState: TagModal = {
    open: false,
    id: null,
};

export const tagSlice = createSlice({
    name: "tagModal",
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

export const {toggleOpen, setId} = tagSlice.actions;

export default tagSlice.reducer; 