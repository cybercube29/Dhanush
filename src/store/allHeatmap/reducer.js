import { createSlice } from "@reduxjs/toolkit";
import { getHeatmapList } from "./thunk";

const getHeatmapListSlice = createSlice({
    name: "getHeatmapList",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshHeatmapList: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getHeatmapList.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getHeatmapList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.frameworks;
            state.isLoaded = true;
        });
        builder.addCase(getHeatmapList.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshHeatmapList } = getHeatmapListSlice.actions;
export default getHeatmapListSlice.reducer;