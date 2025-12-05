import { GetLoggedInUserAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLoggedInUserDetails = createAsyncThunk('getLoggedInUserDetails', async () => {
    const response = await GetLoggedInUserAPI();
    return response.data;
});