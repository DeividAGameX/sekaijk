import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface LayoutState {
    titulo: string;
    menuCollapsed: boolean;
    drawerCollapsed: boolean;
    breakPoint: boolean;
}

const initialState: LayoutState = {
    titulo: "",
    menuCollapsed: false,
    drawerCollapsed: false,
    breakPoint: false,
};

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setTitulo: (state, action: PayloadAction<string>) => {
            state.titulo = action.payload;
        },
        toggleMenuCollapsed: (state, action: PayloadAction<boolean>) => {
            state.menuCollapsed = action.payload;
        },
        toggleDrawerCollapsed: (state, action: PayloadAction<boolean>) => {
            state.drawerCollapsed = action.payload;
        },
        setBreak: (state, action: PayloadAction<boolean>) => {
            state.breakPoint = action.payload;
        },
    },
});

export const {setTitulo, toggleMenuCollapsed, toggleDrawerCollapsed, setBreak} =
    layoutSlice.actions;

export default layoutSlice.reducer;
