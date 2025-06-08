import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SiderBarState {
    text: string | null;
}

const initialState: SiderBarState = {
    text: null,
};

export const navBarSlice = createSlice({
    name: "navBar",
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
        resetText(state) {
            state.text = null;
        },
    },
});

export const {setText, resetText} = navBarSlice.actions;

export default navBarSlice.reducer;
