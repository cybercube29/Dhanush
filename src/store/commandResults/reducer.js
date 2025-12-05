import { createSlice } from "@reduxjs/toolkit";
import { getCommandResults } from "./thunk";

const getCommandResultsSlice = createSlice({
    name: "getCommandResults",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: [],
    },
    reducers: {
        refreshCommandResult: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCommandResults.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getCommandResults.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getCommandResults.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { refreshCommandResult } = getCommandResultsSlice.actions;
export default getCommandResultsSlice.reducer;