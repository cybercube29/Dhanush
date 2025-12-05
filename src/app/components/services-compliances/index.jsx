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
import ScanFormFeilds from "../scan/ScanFormFeilds";
import FilterTabsContentForServices from "./FilterTabsContentForServices";

export default function ServicesContainer() {
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
        isLoaded: isHeatmapLoaded,
        data: heatmapData,
    } = useSelector((state) => state.HeatmapList);

    // Local state
    const [value, setValue] = useState("1");
    const [selectedCloud, setSelectedCloud] = useState(defaultCloud);
    const [selectedAsset, setSelectedAsset] = useState(defaultAsset);
    const [selectedScan, setSelectedScan] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

            <FilterTabsContentForServices
                value={value}
                handleChange={handleChange}
                heatmapData={heatmapData}
                cloudCategory={selectedCloud}
                selectedAsset={selectedAsset}
                selectedScan={selectedScan}
                scanEntryDate={scanEntryDate}
            />
        </>
    );
}
