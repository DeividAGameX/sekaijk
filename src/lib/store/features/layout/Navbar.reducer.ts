import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface NavBarProp {
    text: string | null;
    matchWith: string | null;
}

const initialState: NavBarProp = {
    text: null,
    matchWith: null,
};

export const navBarSlice = createSlice({
    name: "navBar",
    initialState,
    reducers: {
        setText(
            state,
            action: PayloadAction<{text: string; matchWith: string}>
        ) {
            state.text = action.payload.text;
            state.matchWith = action.payload.matchWith;
        },
        resetText(state) {
            state.text = null;
        },
    },
});

export const {setText, resetText} = navBarSlice.actions;

export default navBarSlice.reducer;
