import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOn: false
}

const siderbarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setSidebarOn: (state) => {
            state.isSidebarOn = true;
        },
        setSidebarOff: (state) => {
            state.isSidebarOn = false;
        },
    }
});

export const { setSidebarOn, setSidebarOff } = siderbarSlice.actions;
export const getSidebarStatus = (state) => state.sidebar.isSidebarOn;

export default siderbarSlice.reducer;