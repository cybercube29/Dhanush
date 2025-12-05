import { getHeatmapList } from '@/store/allHeatmap/thunk';
import { Button, Grid, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomSelect from '../forms/CustomSelect';
import toast from 'react-hot-toast';

export default function ScanFormFeilds({
    assetOptions,
    scanOptions,
    selectedCloud,
    setSelectedCloud,
    selectedAsset,
    setSelectedAsset,
    selectedScan,
    setSelectedScan,
    handleAddScan,
}) {
    const dispatch = useDispatch();

    // Update scan when scanOptions change
    useEffect(() => {
        if (scanOptions.length > 0) {
            setSelectedScan(scanOptions[0].id);
        } else {
            setSelectedScan('');
        }
    }, [scanOptions]);


    const handleSubmit = () => {
        if (!selectedScan) {
            toast.error("No scan available. Please add a scan first.");
            return;
        }
        dispatch(getHeatmapList(selectedScan));
    };

    return (
        <>
            <Grid container spacing={1} mb={1}>
                <Grid item xs={12} lg={1}>
                    <Typography variant='h6' fontWeight={600}>Scan</Typography>
                </Grid>
                <Grid item xs={12} lg={3.5}>
                    <Typography variant='h6' fontWeight={600}>Select Cloud Category</Typography>
                </Grid>
                <Grid item xs={12} lg={3.5}>
                    <Typography variant='h6' fontWeight={600}>Asset</Typography>
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Typography variant='h6' fontWeight={600}>Scan</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={12} lg={1}>
                    <Stack direction="row" spacing={1}>
                        <Button size='small' variant='contained' onClick={handleAddScan}>Add Scan</Button>
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={3.5}>
                    <CustomSelect
                        fullWidth
                        value={selectedCloud}
                        onChange={(e) => {
                            setSelectedCloud(e.target.value);
                            setSelectedAsset('');
                            setSelectedScan('')
                        }}
                    >
                        <MenuItem value="aws" sx={{ fontSize: ".8rem" }}>AWS</MenuItem>
                        <MenuItem value="azure" sx={{ fontSize: ".8rem" }}>Azure</MenuItem>
                        <MenuItem value="gcp" sx={{ fontSize: ".8rem" }}>GCP</MenuItem>
                    </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={3.5}>
                    <CustomSelect
                        fullWidth
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                    >
                       {assetOptions.filter(asset => asset.cloudType === selectedCloud).length > 0 ? (
                            assetOptions
                                .filter(asset => asset.cloudType === selectedCloud)
                                .map((asset) => (
                                    <MenuItem key={asset.id} value={asset.profileName} sx={{ fontSize: ".8rem" }}>
                                        {asset.profileName} {
                                            <span style={{ color: "#888", fontSize: "0.75rem", marginLeft: "8px" }}>
                                                {asset.remark}
                                            </span>}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem disabled value="" sx={{ fontSize: ".8rem" }}>
                                No Assets Available
                            </MenuItem>
                        )}
                    </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={3}>
                    <CustomSelect
                        fullWidth
                        value={selectedScan}
                        onChange={(e) => setSelectedScan(e.target.value)}
                    >
                        {scanOptions.length > 0 ? (
                            [...scanOptions]
                                .sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate))
                                .map((scan) => (
                                    <MenuItem key={scan.id} value={scan.id} sx={{ fontSize: ".7rem" }}>
                                        {moment(scan.entryDate).format("YYYY-MM-DD HH:mm:ss")}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem disabled value="" sx={{ fontSize: ".7rem" }}>
                                No Scans Available
                            </MenuItem>
                        )}
                    </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={1}>
                    <Button size='small' variant='contained' onClick={handleSubmit}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}