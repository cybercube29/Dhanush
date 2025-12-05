import { GetCommonCommandCatagoriesAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCloudServicesList = createAsyncThunk('getCloudServicesList', async (clientid) => {
    const response = await GetCommonCommandCatagoriesAPI(clientid);
    return response.data;
});