"use client";

import { DeleteCloudProfileAPI } from "@/axios/apis";
import { refreshCloudProfileList } from "@/store/allCloudProfileList/reducer";
import { getCloudProfileList } from "@/store/allCloudProfileList/thunk";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { TableSkeleton } from "../shared/TableSkeleton";
import AddAssetForm from "./AddAssetForm";
import { getAssetColumns } from "./AssetColumns";
import AssetTableCard from "./AssetTableCard";
import AssetsList from "./AssetsList";
import ConfirmDeleteProfile from "./ConfirmDeleteProfile";
import EditAssetForm from "./EditAssetForm";
import SelectServicesDialog from "./SelectServicesDialog";

export default function AssetManagement({ allowedClouds = ['aws', 'azure', 'gcp'] }) {
    const dispatch = useDispatch();
    const { data: userDetails } = useSelector(state => state.UserDetails);
    const { isLoading, isLoaded, data } = useSelector(state => state.CloudProfilesList);

    useEffect(() => {
        if (!isLoaded && userDetails?.clientCompanyId) {
            dispatch(getCloudProfileList(userDetails?.clientCompanyId));
        }
    }, [dispatch, userDetails, isLoaded]);

    const [editAssetDialog, setEditAssetDialog] = useState(false);
    const [selectedAssetForEdit, setSelectedAssetForEdit] = useState(null);

    const toggleEditAssetDialog = (asset) => {
        setSelectedAssetForEdit(asset);
        setEditAssetDialog(!editAssetDialog);
    };

    // Edit the handleEdit function to open the dialog
    const handleEdit = (data) => {
        toggleEditAssetDialog(data);  // Open edit dialog with the selected asset
    };

    const handleDelete = (data) => {
        toast.dismiss();

        toast((t) => (
            <ConfirmDeleteProfile
                toastId={t.id}
                onConfirm={async () => {
                    try {
                        const response = await DeleteCloudProfileAPI(data.id);
                        if (response.status === 200) {
                            toast.success(response.data);
                            dispatch(getCloudProfileList(userDetails?.clientCompanyId));
                        } else {
                            toast.error(response.data || "Failed to delete.");
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Error occurred while deleting.");
                    }
                }}
            />
        ), { duration: Infinity });
    };

    // Toggle Asset
    const [toggleAssets, setToggleAssets] = useState(false);
    const handleToggleAssets = () => {
        setToggleAssets(!toggleAssets);
    }

    // Add Asset Dialog
    const [addAssetDialog, setAddAssetDialog] = useState(false);
    const [selectedAssetForAdd, setSelectedAssetForAdd] = useState(null);
    const toggleAddAssetDialog = (asset) => {
        setSelectedAssetForAdd(asset)
        setAddAssetDialog(!addAssetDialog);
    };

    // Add Scan Dialog
    const [addScanDialog, setAddScanDialog] = useState(false);
    const [selectedAssetForAddScan, setSelectedAssetForAddScan] = useState(null);
    const [assetId, setAssetId] = useState(null);
    const toggleAddScanDialog = (data) => {
        setAddScanDialog(!addScanDialog);
        setSelectedAssetForAddScan(data)
        setAssetId(data?.id)
    };

    const columns = getAssetColumns(toggleAddScanDialog, handleEdit, handleDelete);

    if (isLoading) {
        return (
            <Stack gap={1}>
                <TableSkeleton rows={2} />
                <TableSkeleton rows={2} />
                <TableSkeleton rows={2} />
            </Stack>
        );
    }

    return (
        <>
            {toggleAssets ?
                <AssetsList
                    handleToggleAssets={handleToggleAssets}
                    toggleAddAssetDialog={toggleAddAssetDialog}
                /> :
                <Stack gap={1}>
                    {/* {['aws', 'azure', 'gcp'].map(cloudType => ( */}
                    {allowedClouds.map(cloudType => (
                        <AssetTableCard
                            key={cloudType}
                            title={`${cloudType.toUpperCase()} Accounts List`}
                            data={data?.filter(item => item.cloudType === cloudType)}
                            columns={columns}
                            onRefresh={() => dispatch(refreshCloudProfileList())}
                            handleToggleAssets={handleToggleAssets}
                        />
                    ))}
                </Stack>}

            {addAssetDialog && (
                <AddAssetForm
                    addAssetDialog={addAssetDialog}
                    toggleAddAssetDialog={toggleAddAssetDialog}
                    selectedAssetForAdd={selectedAssetForAdd}
                    onSuccess={getCloudProfileList(userDetails?.clientCompanyId)}
                    handleToggleAssets={handleToggleAssets}
                />)}

            {editAssetDialog && (
                <EditAssetForm
                    editAssetDialog={editAssetDialog}
                    toggleEditAssetDialog={toggleEditAssetDialog}
                    selectedAssetForEdit={selectedAssetForEdit}
                    onSuccess={getCloudProfileList(userDetails?.clientCompanyId)}
                    setSelectedAssetForEdit={setSelectedAssetForEdit}
                />
            )}

            {addScanDialog && (
                <SelectServicesDialog
                    open={addScanDialog}
                    onClose={() => setAddScanDialog(false)}
                    assetData={selectedAssetForAddScan}
                    onSuccess={getCloudProfileList(userDetails?.clientCompanyId)}
                    assetId={assetId}
                />)}
        </>
    );
}
