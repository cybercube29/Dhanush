import { commonRequest } from "./config";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

// Generic API Request Function
const apiRequest = async (method, endpoint, data = null, headers = {}, responseType = 'json') => {
    try {
        return await commonRequest(method, `${BASE_URL}${endpoint}`, data, headers, responseType);
    } catch (error) {
        console.error(`Error in API Request: ${method} ${endpoint}`, error);
        throw error;
    }
};

export const GetLoggedInUserAPI = async () => await commonRequest("GET", `${AUTH_URL}/user/get-user`);
export const GetCloudProfileListAPI = (clientId) => apiRequest("GET", `/cloud-profile/get-profile-list/${clientId}`);
export const AddCloudProfileAPI = (data) => apiRequest("POST", `/cloud-profile/add-profile`, data);
export const EditCloudProfileAPI = (data) => apiRequest("PUT", `/cloud-profile/edit-profile`, data);
export const DeleteCloudProfileAPI = (id) => apiRequest("DELETE", `/cloud-profile/delete-profile/${id}`);
export const GetCommonCommandCatagoriesAPI = () => apiRequest("GET", `/common-commands/get-common-command-categories`);
export const AddScanAPI = (data) => apiRequest("POST", `/scan/add-scan-categories`, data);
export const ReScanAPI = (data) => apiRequest("POST", `/scan/re-scan-categories`, data);
export const GetCloudScanListAPI = (clientId, asset) => apiRequest("GET", `/scan/get-scan-list/${clientId}/${asset}`);
export const GetHeatmapListAPI = (id) => apiRequest("GET", `/scan/get-scan2/${id}`);
export const GetScanFrameworkListAPI = (scanId, frameworkType, framework) => apiRequest("GET", `/scan/get-scan-framework2/${scanId}/${frameworkType}/${framework}`);
export const ReScanFrameworkAPI = (data) => apiRequest("PUT", `/scan/re-scan-framework`, data);
export const ReScanCommandsAPI = (data) => apiRequest("PUT", `/scan/re-scan-commands`, data);
export const GetCommandResultAPI = (scanId, csrId) => apiRequest("GET", `/csr/get-command-result/${scanId}/${csrId}`);

//dashboard apis
export const DashboardScanErrorDataAPI = () => apiRequest('GET', '/cloud-profile/status-counts')
export const DashboardGroupDataAPI = () => apiRequest('GET', '/cloud-profile/grouped-profile-counts')