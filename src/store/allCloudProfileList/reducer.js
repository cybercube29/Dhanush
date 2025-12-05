import { createSlice } from "@reduxjs/toolkit";
import { getCloudProfileList } from "./thunk";

const getCloudProfileListSlice = createSlice({
    name: "getCloudProfileList",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshCloudProfileList: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCloudProfileList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getCloudProfileList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getCloudProfileList.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshCloudProfileList } = getCloudProfileListSlice.actions;
export default getCloudProfileListSlice.reducer;