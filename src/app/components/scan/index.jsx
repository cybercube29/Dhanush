"use client";

import { getCloudProfileList } from '@/store/allCloudProfileList/thunk';
import { getCloudScanList } from '@/store/allCloudScanList/thunk';
import { getHeatmapList } from '@/store/allHeatmap/thunk';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectServicesDialog from '../asset-management/SelectServicesDialog';
import Loader from '../shared/Loader';
import FilterTabsContentForHeatmap from './FilterTabsContentForHeatmap';
import ScanFormFeilds from './ScanFormFeilds';
import moment from 'moment';

export default function CloudScan() {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const defaultCloudCategory = searchParams.get("cloud");
    const defaultAsset = searchParams.get("asset");

    const { data: userDetails } = useSelector(state => state.UserDetails);
    const { isLoading: assetLoading, isLoaded: isAssetLoaded, data: assetData } = useSelector(state => state.CloudProfilesList);
    const { isLoading: cloudScanLoading, isLoaded: isCloudScanLoaded, data: cloudScanData } = useSelector(state => state.CloudScanList);
    const { isLoading: heatmapLoading, isLoaded: isHeatmapLoaded, data: heatmapData } = useSelector(state => state.HeatmapList);

    const [value, setValue] = useState('1');
    const [selectedCloud, setSelectedCloud] = useState(defaultCloudCategory || 'aws');
    const [selectedAsset, setSelectedAsset] = useState(defaultAsset || '');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Services select dialog
    const [addScanDialog, setAddScanDialog] = useState(false);
    const [assetId, setAssetId] = useState(null);
    const [selectedScan, setSelectedScan] = useState('');

    const handleAddScan = () => {
        setAddScanDialog(!addScanDialog)
        const data = assetData.find((asset) => asset.profileName === selectedAsset)
        setAssetId(data?.id);
    };

    const selectedScanDetails = cloudScanData.find(scan => scan.id === selectedScan);
    const scanEntryDate = selectedScanDetails ? moment(selectedScanDetails.entryDate).format("YYYY-MM-DD HH:mm:ss") : "";

    // Load assets once
    useEffect(() => {
        if (!isAssetLoaded && userDetails?.clientCompanyId) {
            dispatch(getCloudProfileList(userDetails.clientCompanyId));
        }
    }, [dispatch, userDetails, isAssetLoaded]);

    // Load scan list when asset is selected
    useEffect(() => {
        if (selectedAsset && userDetails?.clientCompanyId) {
            dispatch(getCloudScanList({
                clientid: userDetails.clientCompanyId,
                asset: selectedAsset
            }));
        }
    }, [dispatch, selectedAsset, userDetails]);

    // Load heatmap for first scan (optional)
    useEffect(() => {
        if (!isHeatmapLoaded && cloudScanData.length > 0) {
            dispatch(getHeatmapList(cloudScanData[0].id));
        }
    }, [dispatch, isHeatmapLoaded, cloudScanData]);

    if (heatmapLoading) return <Loader />

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
                handleAddScan={handleAddScan}
            />


            <FilterTabsContentForHeatmap
                handleChange={handleChange}
                value={value}
                heatmapData={heatmapData}
                cloudCategory={selectedCloud}
                selectedAsset={selectedAsset}
                selectedScan={selectedScan}
                scanEntryDate={scanEntryDate}
            />
            
            {addScanDialog && (
                <SelectServicesDialog
                    open={addScanDialog}
                    onClose={() => setAddScanDialog(false)}
                    assetId={assetId}
                />)}
        </>
    );
}
