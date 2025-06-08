import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SiderBarState {
    open: boolean;
    isBreak: boolean;
}

const initialState: SiderBarState = {
    open: false,
    isBreak: false,
};

export const siderBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        toggleState: (state) => {
            state.open = !state.open;
        },
        setIsBreak: (state, action: PayloadAction<boolean>) => {
            state.isBreak = action.payload;
        },
    },
});

export const {toggleState, setIsBreak} = siderBarSlice.actions;

export default siderBarSlice.reducer;
