"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import moment from "moment";

// ✅ APIs
import { getCloudProfileList } from "@/store/allCloudProfileList/thunk";
import { getCloudScanList } from "@/store/allCloudScanList/thunk";
import { getHeatmapList } from "@/store/allHeatmap/thunk";

// ✅ Components
import Loader from "../shared/Loader";
import ScanFormFeilds from "./ScanFormFeilds";
import HeatmapList from "./HeatmapList";
import AllFilterDialog from "./AllFilterDialog";
import { Box, Button } from "@mui/material";

export default function Heatmap() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();

    const defaultCloud = searchParams.get("cloud") || "aws";
    const defaultAsset = searchParams.get("asset") || "";

    // Redux states
    const { data: userDetails } = useSelector((state) => state.UserDetails);
    const { isLoaded: isAssetLoaded, data: assetData } = useSelector(
        (state) => state.CloudProfilesList
    );
    const { data: cloudScanData } = useSelector((state) => state.CloudScanList);
    const {
        isLoading: heatmapLoading,
        data: heatmapData,
    } = useSelector((state) => state.HeatmapList);

    // Local state
    const [selectedCloud, setSelectedCloud] = useState(defaultCloud);
    const [selectedAsset, setSelectedAsset] = useState(defaultAsset);
    const [selectedScan, setSelectedScan] = useState("");

    const [filterDialog, setFilterDialog] = useState(false);
    const [selectedFrameworks, setSelectedFrameworks] = useState("ALL");

    const toggleFilterDialog = () => setFilterDialog(!filterDialog);

    // scan entry date
    const selectedScanDetails = cloudScanData.find(
        (scan) => scan.id === selectedScan
    );
    const scanEntryDate = selectedScanDetails
        ? moment(selectedScanDetails.entryDate).format("YYYY-MM-DD HH:mm:ss")
        : "";

    // Load assets
    useEffect(() => {
        if (!isAssetLoaded && userDetails?.clientCompanyId) {
            dispatch(getCloudProfileList(userDetails.clientCompanyId));
        }
    }, [dispatch, userDetails, isAssetLoaded]);

    // Load scans when asset changes
    useEffect(() => {
        if (selectedAsset && userDetails?.clientCompanyId) {
            dispatch(
                getCloudScanList({
                    clientid: userDetails.clientCompanyId,
                    asset: selectedAsset,
                })
            );
        }
    }, [dispatch, selectedAsset, userDetails]);

    // Load heatmap for selected scan
    useEffect(() => {
        if (selectedScan) {
            dispatch(getHeatmapList(selectedScan));
        }
    }, [dispatch, selectedScan]);

    if (heatmapLoading) return <Loader />;

    return (
        <>
            <ScanFormFeilds
                assetOptions={assetData}
                scanOptions={cloudScanData}
                selectedCloud={selectedCloud}
                setSelectedCloud={setSelectedCloud}
                selectedAsset={selectedAsset}
                setSelectedAsset={setSelectedAsset}
                selectedScan={selectedScan}
                setSelectedScan={setSelectedScan}
            />

            <Box mb={1} mt={1}>
                <Button onClick={toggleFilterDialog} variant="outlined">
                    Filter Heatmap
                </Button>
            </Box>

            <HeatmapList
                heatmapData={
                    selectedFrameworks === "ALL"
                        ? heatmapData
                        : heatmapData.filter((item) =>
                            selectedFrameworks.includes(item.frameworkName)
                        )
                }
                cloudCategory={selectedCloud}
                selectedAsset={selectedAsset}
                selectedScan={selectedScan}
                scanEntryDate={scanEntryDate}
            />

            {filterDialog && (
                <AllFilterDialog
                    open={filterDialog}
                    toggleDialog={toggleFilterDialog}
                    heatmapData={heatmapData}
                    onApply={(list) => setSelectedFrameworks(list)}
                />
            )}
        </>
    );
}
