import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PostStore {
    open: boolean;
    query: string;
}

export const initialState: PostStore = {
    open: false,
    query: "",
};

export const postSlice = createSlice({
    name: "postStore",
    initialState,
    reducers: {
        toggleOpen: (state) => {
            state.open = !state.open;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
    },
});

export const {toggleOpen, setQuery} = postSlice.actions;
export default postSlice.reducer;
