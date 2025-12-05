import { EditCloudProfileAPI } from '@/axios/apis';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CustomTextField from '../forms/CustomTextField';

export default function EditAssetForm({
    editAssetDialog,
    toggleEditAssetDialog,
    selectedAssetForEdit,
    onSuccess,
    setSelectedAssetForEdit
}) {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        remark: "",
        accessId: "",
        accessKey: "",
        region: "",
        subscriptionKey: "",
        json: "",
        status: "ACTIVE",
        cloudType: ""  // Initialize cloudType here
    });

    const awsRegions = [
        "us-east-1", "us-east-2", "us-west-1", "us-west-2",
        "af-south-1", "ap-east-1", "ap-south-2", "ap-southeast-3",
        "ap-southeast-4", "ap-southeast-5", "ap-south-1", "ap-northeast-2",
        "ap-northeast-3", "ap-southeast-1", "ap-southeast-2", "ap-east-2",
        "ap-southeast-7", "ap-northeast-1", "ca-central-1", "ca-west-1",
        "eu-central-1", "eu-central-2", "eu-west-1", "eu-west-2",
        "eu-west-3", "eu-south-1", "eu-south-2", "eu-north-1",
        "il-central-1", "mx-central-1", "me-south-1", "me-central-1",
        "sa-east-1", "us-gov-east-1", "us-gov-west-1"
    ];

    useEffect(() => {
        if (selectedAssetForEdit && Object.keys(selectedAssetForEdit).length > 0) {
            const { remark = "", serverCredentials = {}, status = "ACTIVE", cloudType = "" } = selectedAssetForEdit;

            const defaultData = {
                remark,
                status,
                cloudType,
                accessId: serverCredentials.aws?.accessId || "",
                accessKey: serverCredentials.aws?.accessKey || "",
                region: serverCredentials.aws?.region || "",
                subscriptionKey: serverCredentials.azure?.subscriptionKey || "",
                json: serverCredentials.gcp?.json || "",
            };

            setFormData(defaultData);  // Set the formData with existing asset values
        }
    }, [selectedAssetForEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormValid = () => {
        const { remark, accessId, accessKey, region, subscriptionKey, json } = formData;

        if (!remark) return false;

        switch (formData.cloudType) {
            case "aws":
                return accessId && accessKey && region;
            case "azure":
                return !!subscriptionKey;
            case "gcp":
                return !!json;
            default:
                return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { remark, status, cloudType } = formData;
            let filteredData = { id: selectedAssetForEdit.id, remark, status };

            if (cloudType === "aws") {
                filteredData = {
                    ...filteredData,
                    accessId: formData.accessId,
                    accessKey: formData.accessKey,
                    region: formData.region,
                };
            } else if (cloudType === "azure") {
                filteredData = {
                    ...filteredData,
                    subscriptionKey: formData.subscriptionKey,
                };
            } else if (cloudType === "gcp") {
                filteredData = {
                    ...filteredData,
                    json: formData.json,
                };
            }

            const response = await EditCloudProfileAPI(filteredData);
            if (response.status === 200) {
                toast.success(response.data);
                toggleEditAssetDialog();
                dispatch(onSuccess)
            } else {
                toast.error(response.data);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update asset.");
        }
    };

    return (
        <Dialog open={editAssetDialog} onClose={toggleEditAssetDialog} fullWidth maxWidth="sm">
            <DialogTitle>Edit Asset</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ paddingTop: '0', paddingBottom: '0' }}>
                    <Grid container spacing={3} mb={3}>
                        {/* Status Field */}
                        <Grid item xs={6}>
                            <TextField
                                select
                                margin="dense"
                                id="status"
                                name="status"
                                label="Status"
                                fullWidth
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="ACTIVE">Active</MenuItem>
                                <MenuItem value="INACTIVE">Inactive</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Conditional Fields for AWS */}
                        {formData.cloudType === "aws" && (
                            <>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        margin="dense"
                                        name="accessId"
                                        label="Access ID"
                                        type="text"
                                        autoComplete="off"
                                        fullWidth
                                        value={formData.accessId}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        margin="dense"
                                        name="accessKey"
                                        label="Access Key"
                                        type="text"
                                        autoComplete="off"
                                        fullWidth
                                        value={formData.accessKey}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField
                                        margin="dense"
                                        name="region"
                                        label="Region"
                                        type="text"
                                        fullWidth
                                        value={formData.region}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Conditional Fields for Azure */}
                        {formData.cloudType === "azure" && (
                            <Grid item xs={6}>
                                <CustomTextField
                                    margin="dense"
                                    name="subscriptionKey"
                                    label="Subscription Key"
                                    type="text"
                                    fullWidth
                                    value={formData.subscriptionKey}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}

                        {/* Conditional Fields for GCP */}
                        {formData.cloudType === "gcp" && (
                            <Grid item xs={6}>
                                <CustomTextField
                                    margin="dense"
                                    name="json"
                                    label="JSON"
                                    type="text"
                                    fullWidth
                                    value={formData.json}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}

                        {/* Remark Field */}
                        <Grid item xs={6}>
                            <CustomTextField
                                margin="dense"
                                name="remark"
                                label="Remark"
                                type="text"
                                fullWidth
                                value={formData.remark}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={toggleEditAssetDialog}>
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" disabled={!isFormValid()}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}