import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CarouselProp {
    current: number;
    prev: number;
    direction: "Left" | "Right";
}

const initialState: CarouselProp = {
    current: 0,
    prev: 2,
    direction: "Right",
};

export const CarouselSlice = createSlice({
    name: "carrouselSlice",
    initialState,
    reducers: {
        setCurrent: (state, action: PayloadAction<number>) => {
            state.current = action.payload;
        },
        nextElement: (state) => {
            state.direction = "Right";
            if (state.current + 1 > 2) {
                state.current = 0;
                state.prev = 2;
            } else {
                state.prev = state.current;
                state.current += 1;
            }
        },
        prevElement: (state) => {
            state.direction = "Left";
            if (state.current - 1 < 0) {
                state.current = 2;
                state.prev = 0;
            } else {
                state.prev = state.current;
                state.current = state.current - 1;
            }
        },
    },
});

export const {setCurrent, nextElement, prevElement} = CarouselSlice.actions;

export default CarouselSlice.reducer;
