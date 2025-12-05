import { GetCloudProfileListAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCloudProfileList = createAsyncThunk('getCloudProfileList', async (clientid) => {
    const response = await GetCloudProfileListAPI(clientid);
    return response.data;
});