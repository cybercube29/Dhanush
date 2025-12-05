import { createSlice } from "@reduxjs/toolkit";
import { getCloudServicesList } from "./thunk";

const getCloudServicesListSlice = createSlice({
    name: "getCloudServicesList",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshCloudServicesList: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCloudServicesList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getCloudServicesList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getCloudServicesList.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshCloudServicesList } = getCloudServicesListSlice.actions;
export default getCloudServicesListSlice.reducer;