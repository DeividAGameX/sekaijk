import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CategoryModal {
    open: boolean;
    id: number | null;
}

const initialState: CategoryModal = {
    open: false,
    id: null,
};

export const categorySlice = createSlice({
    name: "sideBar",
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

export const {toggleOpen, setId} = categorySlice.actions;

export default categorySlice.reducer;
