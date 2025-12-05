import { createSlice } from "@reduxjs/toolkit";
import { getLoggedInUserDetails } from "./thunk";

const getLoggedInUserDetailsSlice = createSlice({
    name: "getLoggedInUserDetails",
    initialState: {
        isLoading: false,
        isError: false,
        isLoaded: false,
        data: {}
    },
    reducers: {
        resetUserDetails: (state) => {
            state.isLoaded = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLoggedInUserDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getLoggedInUserDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoaded = true;
        });
        builder.addCase(getLoggedInUserDetails.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isLoaded = false;
        });

    }
});
export const { resetUserDetails } = getLoggedInUserDetailsSlice.actions;
export default getLoggedInUserDetailsSlice.reducer;