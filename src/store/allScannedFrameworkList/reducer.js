import { createSlice } from "@reduxjs/toolkit";
import { getScanFrameworkList } from "./thunk";

const getScanFrameworkListSlice = createSlice({
    name: "getScanFrameworkList",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshScanFrameworkList: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getScanFrameworkList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getScanFrameworkList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getScanFrameworkList.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshScanFrameworkList } = getScanFrameworkListSlice.actions;
export default getScanFrameworkListSlice.reducer;