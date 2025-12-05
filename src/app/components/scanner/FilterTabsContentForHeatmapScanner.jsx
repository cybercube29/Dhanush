'use client'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Divider, Stack, Tab, Typography } from '@mui/material';
import { IconApps, IconChartDots, IconLayoutGrid } from '@tabler/icons-react';
import { useState } from 'react';
import ComplianceFilterDialog from './ComplianceFilterScanner';
import HeatmapList from './HeatmapListScanner';
import ServiceFilterDialog from './ServiceFilterScanner';

export default function FilterTabsContentForHeatmapScanner({
    value,
    heatmapData,
    cloudCategory,
    selectedAsset,
    selectedScan,
    scanEntryDate
}) {

    const servicesTabPanelData = heatmapData?.filter(data => data.frameworkType === 'categories');
    const complianceHeatmapTabPanelData = heatmapData?.filter(data => data.frameworkType === 'compliance');

    const [selectedServiceFrameworks, setSelectedServiceFrameworks] = useState('ALL');
    const [selectedComplianceFrameworks, setSelectedComplianceFrameworks] = useState('ALL');

    // Filter Dialogs
    const [servicesFilterDialog, setServicesFilterDialog] = useState(false);
    const toggleServicesFilterDialog = () => {
        setServicesFilterDialog(!servicesFilterDialog);
    }

    const [complianceFilterDialog, setComplianceFilterDialog] = useState(false);
    const toggleComplianceFilterDialog = () => {
        setComplianceFilterDialog(!complianceFilterDialog);
    }

    // Filter service by status active or inactive
    const [filteredServicesData, setFilteredServicesData] = useState(servicesTabPanelData);


    return (
        <>
            <Box mt={1}>
                <TabContext value={value}>
                    <TabPanel value="1" sx={{ px: 0, py: 0, pt: 2 }}>
                        <HeatmapList
                            heatmapData={heatmapData}
                            cloudCategory={cloudCategory}
                            selectedAsset={selectedAsset}
                            selectedScan={selectedScan}
                            scanEntryDate={scanEntryDate}
                        />
                    </TabPanel>
                    <TabPanel value="2" sx={{ px: 0, py: 0, pt: 2 }}>
                        <HeatmapList
                            heatmapData={
                                selectedServiceFrameworks === "ALL"
                                    ? filteredServicesData
                                    : filteredServicesData.filter(item =>
                                        selectedServiceFrameworks.includes(item.frameworkName)
                                    )
                            }
                            cloudCategory={cloudCategory}
                            selectedAsset={selectedAsset}
                            selectedScan={selectedScan}
                            scanEntryDate={scanEntryDate}
                        />
                    </TabPanel>


                </TabContext>
            </Box>

            {servicesFilterDialog && (<ServiceFilterDialog
                servicesFilterDialog={servicesFilterDialog}
                toggleServicesFilterDialog={toggleServicesFilterDialog}
                heatmapData={servicesTabPanelData}
                onApply={(selectedList) => {
                    setSelectedServiceFrameworks(selectedList);
                }}
            />)}

            {complianceFilterDialog && (
                <ComplianceFilterDialog
                    complianceFilterDialog={complianceFilterDialog}
                    toggleComplianceFilterDialog={toggleComplianceFilterDialog}
                    heatmapData={complianceHeatmapTabPanelData}
                    onApply={(selectedList) => setSelectedComplianceFrameworks(selectedList)}
                />
            )}
        </>
    );
}