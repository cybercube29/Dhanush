import { GetCloudScanListAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCloudScanList = createAsyncThunk( 'getCloudScanList', async ({ clientid, asset }) => {
    const response = await GetCloudScanListAPI(clientid, asset);
    return response.data;
  }
);