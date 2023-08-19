import { createSlice } from "@reduxjs/toolkit";

interface SidebarProps {
    isSidebarOn: boolean;
}
const initialState: SidebarProps = {
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
export const getSidebarStatus = (state: { sidebar: SidebarProps }): boolean => state.sidebar.isSidebarOn;

export default siderbarSlice.reducer;