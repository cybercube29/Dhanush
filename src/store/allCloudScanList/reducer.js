import { createSlice } from "@reduxjs/toolkit";
import { getCloudScanList } from "./thunk";

const getCloudScanListSlice = createSlice({
    name: "getCloudScanList",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshCloudScanList: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCloudScanList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getCloudScanList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getCloudScanList.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshCloudScanList } = getCloudScanListSlice.actions;
export default getCloudScanListSlice.reducer;