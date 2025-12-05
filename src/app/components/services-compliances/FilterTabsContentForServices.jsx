import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Divider, Stack, Tab, Typography } from "@mui/material";
import { IconLayoutGrid } from "@tabler/icons-react";
import { useState } from "react";
import HeatmapList from "../scan/HeatmapList";
import ServiceFilterDialog from "../scan/ServiceFilterDialog";

export default function FilterTabsContentForServices({
    value,
    handleChange,
    heatmapData,
    cloudCategory,
    selectedAsset,
    selectedScan,
    scanEntryDate,
}) {
    const servicesTabPanelData = heatmapData?.filter(
        (data) => data.frameworkType === "categories"
    );

    const [selectedServiceFrameworks, setSelectedServiceFrameworks] =
        useState("ALL");

    const [servicesFilterDialog, setServicesFilterDialog] = useState(false);
    const toggleServicesFilterDialog = () => {
        setServicesFilterDialog(!servicesFilterDialog);
    };

    const [filteredServicesData, setFilteredServicesData] =
        useState(servicesTabPanelData);

    const filterActiveServices = () => {
        const services = servicesTabPanelData?.filter(
            (data) => data.status === "active"
        );
        setFilteredServicesData(services);
    };

    const filterInactiveServices = () => {
        const services = servicesTabPanelData?.filter(
            (data) => data.status === "inactive"
        );
        setFilteredServicesData(services);
    };

    const resetServicesFilter = () => {
        setFilteredServicesData(servicesTabPanelData);
    };

    return (
        <>
            <Box mt={1}>
                <TabContext value={value}>
                    <Box>
                        <TabList
                            onChange={handleChange}
                            aria-label="Form Tabs"
                            sx={{ minHeight: 30, height: 30 }}
                        >
                            <Tab
                                value="1"
                                label={
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <IconLayoutGrid size={14} />
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            Services - ({servicesTabPanelData.length})
                                        </Typography>
                                    </Stack>
                                }
                                sx={{ px: 2, py: 0.5, minHeight: 32 }}
                            />
                        </TabList>
                    </Box>
                    <Divider />

                    {/* Services */}
                    <TabPanel value="1" sx={{ px: 0, py: 0, pt: 2 }}>
                        <Box mb={1}>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Box>
                                    <Button onClick={toggleServicesFilterDialog}>
                                        Filter Services
                                    </Button>
                                </Box>
                                <Stack spacing={1} direction={"row"}>
                                    <Button onClick={resetServicesFilter}>All</Button>
                                    <Button onClick={filterActiveServices}>Active</Button>
                                    <Button onClick={filterInactiveServices}>Inactive</Button>
                                </Stack>
                            </Stack>
                        </Box>
                        <HeatmapList
                            heatmapData={
                                selectedServiceFrameworks === "ALL"
                                    ? filteredServicesData
                                    : filteredServicesData.filter((item) =>
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

            {servicesFilterDialog && (
                <ServiceFilterDialog
                    servicesFilterDialog={servicesFilterDialog}
                    toggleServicesFilterDialog={toggleServicesFilterDialog}
                    heatmapData={servicesTabPanelData}
                    onApply={(selectedList) => {
                        setSelectedServiceFrameworks(selectedList);
                    }}
                />
            )}
        </>
    );
}
