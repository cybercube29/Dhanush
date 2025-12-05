"use client";

import { ReScanCommandsAPI, ReScanFrameworkAPI } from '@/axios/apis';
import { getCloudProfileList } from '@/store/allCloudProfileList/thunk';
import { getCloudScanList } from '@/store/allCloudScanList/thunk';
import { getHeatmapList } from '@/store/allHeatmap/thunk';
import { getScanFrameworkList } from '@/store/allScannedFrameworkList/thunk';
import { getCommandResults } from '@/store/commandResults/thunk';
import { Button, Stack } from '@mui/material';
import { Parser } from "json2csv";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from "xlsx";
import AdvancedTable from '../shared/AdvancedTable';
import Loader from '../shared/Loader';
import TableCustomCard from '../shared/TableCustomCard';
import ReportFilterWidgets from './ReportFilterWidgets';
import { getReportsColumns } from './ReportsColumns';
import ScanFormFeilds from './ScanFormFeilds';
import ViewReportDetails from './ViewReportDetails';

export default function Reports() {
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const cloudCategoryParam = searchParams.get("cloud");
    const defaultAsset = searchParams.get("asset");
    const scanParam = searchParams.get("scan");
    console.log("scanparam", scanParam);
    const frameworkParam = searchParams.get("framework");
    const frameworkTypeParam = searchParams.get("frameworktype");

    const { data: userDetails } = useSelector(state => state.UserDetails);
    const { isLoading: assetLoading, isLoaded: isAssetLoaded, data: assetData } = useSelector(state => state.CloudProfilesList);
    const { isLoading: cloudScanLoading, isLoaded: isCloudScanLoaded, data: cloudScanData } = useSelector(state => state.CloudScanList);
    const { isLoading: heatmapLoading, isLoaded: isHeatmapLoaded, data: heatmapData } = useSelector(state => state.HeatmapList);
    const { isLoading: scanFrameworkLoading, isLoaded: isScanFrameworkLoaded, data: scanFrameworkData } = useSelector(state => state.ScanFrameworkList);
    const { isLoading: commandResultLoading, isLoaded: isCommandResultLoaded, data: commandResultData } = useSelector(state => state.CommandResult);

    const [selectedCloud, setSelectedCloud] = useState(cloudCategoryParam || 'aws');
    const [selectedAsset, setSelectedAsset] = useState(defaultAsset || '');
    const [selectedScan, setSelectedScan] = useState('');
    const [selectedFramework, setSelectedFramework] = useState(frameworkParam || ''); // Move this here
    const [statusDataWidgets, setStatusDataWidgets] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("NON_COMPLIANT");

    const handleTopCardClick = (status) => {
        setSelectedStatus(status === null ? null : status.toUpperCase());
    };

    const filteredTableData = selectedStatus
        ? scanFrameworkData?.scanFrameworkReport?.filter(item => item.complianceStatus === selectedStatus)
        : scanFrameworkData?.scanFrameworkReport;

    const columns = getReportsColumns({
        onRetestClick: async (data) => {
            const payLoad = {
                sid: selectedScan,
                cloudCommands: [data.command],
            }
            const response = await ReScanCommandsAPI(payLoad);
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data);
            } else {
                toast.error(response.data);
            }
        },
        onViewClick: (data) => {
            setDrawerOpen(!drawerOpen)
            const payLoad = {
                scanId: scanParam,
                csrId: data?.csrId
            };

            dispatch(getCommandResults(payLoad))
        }
    });

    // State for command results
    const [drawerOpen, setDrawerOpen] = useState(false);


    // PDF, EXCEL, CSV
    // Function to export as CSV
    const exportToCSV = () => {
        if (filteredTableData.length === 0) {
            toast.error("No data available for export.");
            return;
        }
        try {
            const fields = Object.keys(filteredTableData[0]); // Get column names
            const json2csvParser = new Parser({ fields });
            const csv = json2csvParser.parse(filteredTableData);

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Report.csv";
            link.click();
            toast.success("CSV file downloaded.");
        } catch (error) {
            console.error("CSV Export Error:", error);
            toast.error("Error exporting CSV.");
        }
    };

    // Function to export as Excel
    const exportToExcel = () => {
        if (filteredTableData.length === 0) {
            toast.error("No data available for export.");
            return;
        }
        try {
            const worksheet = XLSXUtils.json_to_sheet(filteredTableData);
            const workbook = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(workbook, worksheet, "Report");
            XLSXWriteFile(workbook, "Report.xlsx");
            toast.success("Excel file downloaded.");
        } catch (error) {
            console.error("Excel Export Error:", error);
            toast.error("Error exporting Excel.");
        }
    };

    // Function to export as PDF
    const exportToPDF = () => {
        if (filteredTableData.length === 0) {
            toast.error("No data available for export.");
            return;
        }
        try {
            const doc = new jsPDF({ orientation: "landscape" }); // Use landscape mode for more width

            // Set document title
            doc.text("Scan Report", 14, 10);

            // Define table columns
            const tableColumn = ["Index", "Description", "Resource", "Status"];
            const tableRows = filteredTableData.map(row => [
                row.index,
                row.description,
                row.resourceID,
                row.complianceStatus
            ]);

            // Use autoTable to format the table
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                styles: { fontSize: 10 },
                headStyles: { fillColor: [22, 160, 133] }, // Custom header color
                margin: { top: 20 },
                columnStyles: {
                    1: { cellWidth: 150 },
                    2: { cellWidth: 50 },
                    3: { cellWidth: 50 }
                },
            });

            // Save the PDF
            doc.save("Report.pdf");
            toast.success("PDF file downloaded.");
        } catch (error) {
            console.error("PDF Export Error:", error);
            toast.error("Error exporting PDF.");
        }
    };

    // Rescan FrameWork
    const [isRescanning, setIsRescanning] = useState(false);
    const handleRescanFramework = async ({ sid, frameworkType, framework }) => {
        const payLoad = {
            sid: sid,
            framework,
            frameworkType
        }
        setIsRescanning(true);
        const response = await ReScanFrameworkAPI(payLoad)
        if (response.status === 200 || response.status === 201) {
            toast.success(response.data);
            setIsRescanning(false);
            dispatch(getScanFrameworkList({
                scanId: scanParam,
                framework: frameworkParam,
                frameworkType: frameworkTypeParam
            }));
        } else {
            toast.error(response.data);
            setIsRescanning(false);
        }
    }

    useEffect(() => {
        if (!isAssetLoaded && userDetails?.clientCompanyId) {
            dispatch(getCloudProfileList(userDetails.clientCompanyId));
        }
    }, [dispatch, userDetails, isAssetLoaded]);

    useEffect(() => {
        if (selectedAsset && userDetails?.clientCompanyId) {
            dispatch(getCloudScanList({
                clientid: userDetails.clientCompanyId,
                asset: selectedAsset
            }));
        }
    }, [dispatch, selectedAsset, userDetails]);

    useEffect(() => {
        if (!isHeatmapLoaded && cloudScanData.length > 0) {
            dispatch(getHeatmapList(cloudScanData[0].id));
        }
    }, [dispatch, isHeatmapLoaded, cloudScanData]);

    useEffect(() => {
        if (!isScanFrameworkLoaded) {
            dispatch(getScanFrameworkList({
                scanId: scanParam,
                framework: frameworkParam,
                frameworkType: frameworkTypeParam
            }));
        }
    }, [dispatch, isScanFrameworkLoaded]);

    useEffect(() => {
        if (scanFrameworkData?.ptAll) {
            setStatusDataWidgets(scanFrameworkData.ptAll);
        }
    }, [scanFrameworkData]);

    return (
        <>
            <Stack gap={1}>
                <ScanFormFeilds
                    assetOptions={assetData}
                    scanOptions={cloudScanData}
                    selectedCloud={selectedCloud}
                    setSelectedCloud={setSelectedCloud}
                    selectedAsset={selectedAsset}
                    setSelectedAsset={setSelectedAsset}
                    selectedScan={selectedScan}
                    setSelectedScan={setSelectedScan}
                    selectedFramework={selectedFramework} // Pass as prop
                    setSelectedFramework={setSelectedFramework} // Pass setter as prop
                    heatmapLoading={heatmapLoading}
                    heatmapData={heatmapData}
                    frameworkParam={frameworkParam}
                    handleRescanFramework={handleRescanFramework}
                    isRescanning={isRescanning}
                />

                <ReportFilterWidgets
                    statusDataWidgets={statusDataWidgets}
                    onCardClick={handleTopCardClick}
                />

                {drawerOpen && (
                    <ViewReportDetails
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        selectedFramework={selectedFramework}
                        scanCommandResultDetails={commandResultData}
                        commandResultLoading={commandResultLoading}
                    />
                )}

                <Stack direction={"row"} spacing={2}>
                    {/* <Button variant="contained" color="primary" onClick={exportToCSV} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px' }}>
                        Export CSV
                    </Button> */}
                    <Button variant="contained" color="primary" onClick={exportToExcel} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px' }}>
                        Export Excel
                    </Button>
                    <Button variant="contained" color="primary" onClick={exportToPDF} sx={{ fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px' }}>
                        Export PDF
                    </Button>
                </Stack>

                {scanFrameworkLoading || !scanFrameworkData?.scanFrameworkReport ? (
                    <Loader />
                ) : (
                    <TableCustomCard title={"Scanned Reports"}>
                        {({ searchQuery }) => (
                            <AdvancedTable
                                key={selectedStatus || 'all'}
                                tableData={filteredTableData || []}
                                columns={columns}
                                searchQuery={searchQuery}
                            />
                        )}
                    </TableCustomCard>
                )}
            </Stack>
        </>
    );
}