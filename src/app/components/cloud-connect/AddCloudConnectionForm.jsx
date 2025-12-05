import { AddCloudProfileAPI } from "@/axios/apis";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CustomTextField from "../forms/CustomTextField";
import { useRouter } from "next/navigation";

export default function AddCloudConnectionForm({
    open,
    onClose,
    selectedProvider,
    onSuccess,
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const cloudType = selectedProvider?.cloudType;

    const awsRegions = [
        "us-east-1",
        "us-east-2",
        "us-west-1",
        "us-west-2",
        "ap-south-1",
        "ap-northeast-1",
        "eu-central-1",
        "eu-west-1",
    ];

    const initialState = {
        remark: "",
        accessId: "",
        accessKey: "",
        region: "",
        subscriptionKey: "",
        json: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        const { remark, accessId, accessKey, region, subscriptionKey, json } =
            formData;
        if (!remark) return false;

        switch (cloudType) {
            case "aws":
                return accessId && accessKey && region;
            case "azure":
                return !!subscriptionKey;
            case "gcp":
                return !!json;
            default:
                return true;
        }
    };

    const handleSubmit = async () => {
        try {
            let payload = { cloudType, remark: formData.remark };

            if (cloudType === "aws") {
                payload = {
                    ...payload,
                    accessId: formData.accessId,
                    accessKey: formData.accessKey,
                    region: formData.region,
                };
            } else if (cloudType === "azure") {
                payload = { ...payload, subscriptionKey: formData.subscriptionKey };
            } else if (cloudType === "gcp") {
                payload = { ...payload, json: formData.json };
            }

            const response = await AddCloudProfileAPI(payload);
            if (response.status === 201) {
                toast.success(response.data);
                onClose();
                dispatch(onSuccess);
                setFormData(initialState);
                // redirect based on cloudType
                if (cloudType === "aws") {
                    router.push("/aws-accounts");
                } else if (cloudType === "azure") {
                    router.push("/azure-accounts");
                } else if (cloudType === "gcp") {
                    router.push("/gcp-accounts");
                }
            } else {
                toast.error(response.data);
            }
        } catch (error) {
            toast.error("Submission failed");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Cloud Connection</DialogTitle>
            <DialogContent sx={{ pt: 0, pb: 0 }}>
                <Grid container spacing={3} mb={3}>
                    {cloudType === "aws" && (
                        <>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    margin="dense"
                                    name="accessId"
                                    label="Access ID"
                                    type="password"
                                    autoComplete="off"
                                    fullWidth
                                    value={formData.accessId}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CustomTextField
                                    margin="dense"
                                    name="accessKey"
                                    label="Access Key"
                                    type="password"
                                    autoComplete="off"
                                    fullWidth
                                    value={formData.accessKey}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="region-label">Region</InputLabel>
                                    <Select
                                        labelId="region-label"
                                        id="region"
                                        name="region"
                                        value={formData.region}
                                        label="Region"
                                        onChange={handleChange}
                                    >
                                        {awsRegions.map((region) => (
                                            <MenuItem key={region} value={region}>
                                                {region}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </>
                    )}

                    {cloudType === "azure" && (
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                margin="dense"
                                name="subscriptionKey"
                                label="Subscription Key"
                                type='password'
                                // type="text"
                                fullWidth
                                value={formData.subscriptionKey}
                                onChange={handleChange}
                            />
                        </Grid>
                    )}

                    {cloudType === "gcp" && (
                        <Grid item xs={12} md={6}>
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

                    {cloudType && (
                        <Grid item xs={12} md={6}>
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
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    disabled={!isFormValid()}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
