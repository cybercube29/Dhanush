import { getScanFrameworkList } from '@/store/allScannedFrameworkList/thunk';
import { Button, CircularProgress, Grid, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomSelect from '../forms/CustomSelect';

export default function ScanFormFeilds({
    assetOptions,
    scanOptions,
    selectedCloud,
    setSelectedCloud,
    selectedAsset,
    setSelectedAsset,
    selectedScan,
    setSelectedScan,
    heatmapLoading,
    heatmapData,
    frameworkParam,
    selectedFramework, // Receive selectedFramework as a prop
    setSelectedFramework, // Receive setSelectedFramework as a prop
    handleRescanFramework,
    isRescanning,
}) {

    const dispatch = useDispatch();

    const [frameworkType, setFrameworkType] = useState('');

    useEffect(() => {
        if (scanOptions.length > 0) {
            setSelectedScan(scanOptions[0].id);
        } else {
            setSelectedScan('');
        }
    }, [scanOptions]);

    useEffect(() => {
        if (frameworkParam && heatmapData?.length > 0) {
            const match = heatmapData.find(item => item.frameworkName === frameworkParam);
            if (match) {
                setFrameworkType(match.frameworkType);
            }
        }
    }, [frameworkParam, heatmapData]);

    const handleSubmit = () => {
        dispatch(getScanFrameworkList({
            scanId: selectedScan,
            framework: selectedFramework,
            frameworkType: frameworkType
        }));
    };

    return (
        <>
            <Grid container spacing={1} mb={1}>
                <Grid item xs={12} lg={1}><Typography variant='h6' fontWeight={600}>Rescan</Typography></Grid>
                <Grid item xs={12} lg={2.5}><Typography variant='h6' fontWeight={600}>Select Cloud Category</Typography></Grid>
                <Grid item xs={12} lg={2.5}><Typography variant='h6' fontWeight={600}>Asset</Typography></Grid>
                <Grid item xs={12} lg={2}><Typography variant='h6' fontWeight={600}>Scan</Typography></Grid>
                <Grid item xs={12} lg={3}><Typography variant='h6' fontWeight={600}>Security Framework</Typography></Grid>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={12} lg={1}>
                    <Stack direction="row" spacing={1}>
                        {isRescanning ? <CircularProgress size={"20px"} /> :
                            <Button size='small' variant='contained'
                                onClick={() => handleRescanFramework({
                                    sid: selectedScan,
                                    frameworkType,
                                    framework: selectedFramework
                                })}
                            >Rescan</Button>
                        }
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={2.5}>
                    <CustomSelect
                        fullWidth
                        value={selectedCloud}
                        onChange={(e) => {
                            setSelectedCloud(e.target.value);
                            setSelectedAsset('');
                            setSelectedScan('');
                        }}
                    >
                        <MenuItem value="aws" sx={{ fontSize: ".8rem" }}>AWS</MenuItem>
                        <MenuItem value="azure" sx={{ fontSize: ".8rem" }}>Azure</MenuItem>
                        <MenuItem value="gcp" sx={{ fontSize: ".8rem" }}>GCP</MenuItem>
                    </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={2.5}>
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
                                        {asset.profileName}
                                    </MenuItem>
                                ))
                        ) : (
                            <MenuItem disabled value="" sx={{ fontSize: ".8rem" }}>
                                No Assets Available
                            </MenuItem>
                        )}
                    </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={2}>
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

                <Grid item xs={12} lg={3}>
                    <CustomSelect
                        fullWidth
                        value={selectedFramework}
                        onChange={(e) => {
                            setSelectedFramework(e.target.value);
                            const selected = heatmapData.find(item => item.frameworkName === e.target.value);
                            setFrameworkType(selected?.frameworkType || '');
                        }}
                    >
                        {heatmapLoading ? (
                            <MenuItem disabled sx={{ fontSize: '.7rem' }}>
                                <CircularProgress size={20} />
                            </MenuItem>
                        ) : heatmapData.length > 0 ? (
                            heatmapData.map((framework) => (
                                <MenuItem key={framework.frameworkName} value={framework.frameworkName} sx={{ fontSize: '.7rem' }}>
                                    {framework.frameworkName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled sx={{ fontSize: '.7rem' }}>
                                No Frameworks Available
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