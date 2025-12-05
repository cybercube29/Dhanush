import { GetCommandResultAPI } from "@/axios/apis";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCommandResults = createAsyncThunk('getCommandResults', async ({ scanId, csrId }) => {
    const response = await GetCommandResultAPI(scanId, csrId);
    return response.data;
}
);