import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TeamRoleModal} from "../types/teamRole";

const initialState: TeamRoleModal = {
    open: false,
    id: null,
};

export const teamRoleSlice = createSlice({
    name: "teamRoleModal",
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

export const {toggleOpen, setId} = teamRoleSlice.actions;

export default teamRoleSlice.reducer;
