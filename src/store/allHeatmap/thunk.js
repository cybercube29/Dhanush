import { GetHeatmapListAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHeatmapList = createAsyncThunk('getHeatmapList', async (id) => {
    const response = await GetHeatmapListAPI(id);
    return response.data;
}
);