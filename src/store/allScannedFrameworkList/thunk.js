import { GetScanFrameworkListAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getScanFrameworkList = createAsyncThunk('getScanFrameworkList', async ({ scanId, frameworkType, framework }) => {
    const response = await GetScanFrameworkListAPI(scanId, frameworkType, framework);
    return response.data;
}
);