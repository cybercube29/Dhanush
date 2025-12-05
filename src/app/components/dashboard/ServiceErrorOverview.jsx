'use client';
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import {
    Grid,
    Stack,
    Typography,
    Box,
    Card,
    CardContent,
    Chip,
    Skeleton,
} from "@mui/material";
import {
    IconBrandAws,
    IconBrandWindows,
    IconBrandGoogle,
    IconAlertTriangle,
} from "@tabler/icons-react";
import { DashboardScanErrorDataAPI } from "@/axios/apis";

const ServiceErrorOverview = () => {
    const theme = useTheme();
    const [cloudData, setCloudData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await DashboardScanErrorDataAPI();

                if (Array.isArray(res)) {
                    setCloudData(res);
                } else if (Array.isArray(res?.data)) {
                    setCloudData(res.data);
                } else {
                    setCloudData([]);
                }
            } catch (err) {
                console.error("Error fetching error overview:", err);
                setCloudData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🎨 Map API response -> UI format
    const mappedData = cloudData.map((item) => {
        let icon, chipColor, label;
        switch (item.cloudType?.toLowerCase()) {
            case "aws":
                icon = <IconBrandAws size={16} />;
                chipColor = theme.palette.error.main;
                label = "AWS";
                break;
            case "azure":
                icon = <IconBrandWindows size={16} />;
                chipColor = theme.palette.warning.main;
                label = "Azure";
                break;
            case "gcp":
                icon = <IconBrandGoogle size={16} />;
                chipColor = theme.palette.info.main;
                label = "GCP";
                break;
            default:
                icon = null;
                chipColor = theme.palette.grey[500];
                label = item.cloudType;
        }

        const getCount = (status) =>
            item.statuses?.find((s) => s.status === status)?.count || 0;

        const error = getCount("ERROR");
        const nonCompliant = getCount("NON_COMPLIANT");
        const notApplicable = getCount("NOT_APPLICABLE");

        const total = error + nonCompliant + notApplicable;

        return {
            cloud: label,
            icon,
            chipColor,
            error,
            nonCompliant,
            notApplicable,
            total,
        };
    });

    return (
        <Grid container spacing={3}>
            {loading
                ? [1, 2, 3].map((n) => (
                    <Grid item xs={12} sm={6} md={4} key={n}>
                        <Card sx={{ height: "250px", borderRadius: 3, p: 2 }}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width={60}
                                height={24}
                                sx={{ mx: "auto", mb: 2 }}
                            />
                            <Skeleton variant="circular" animation="wave" width={120} height={120} sx={{ mx: "auto" }} />
                            <Skeleton variant="text" animation="wave" width="40%" height={28} sx={{ mx: "auto", mt: 2 }} />
                        </Card>
                    </Grid>
                ))
                : mappedData.map((item, idx) => {
                    const total = item.total;
                    const errorPercent = total > 0 ? Math.round((item.error / total) * 100) : 0;

                    const options = {
                        chart: { type: "radialBar", sparkline: { enabled: true } },
                        colors: [theme.palette.error.main],
                        plotOptions: {
                            radialBar: {
                                startAngle: -135,
                                endAngle: 135,
                                hollow: { size: "70%" },
                                dataLabels: { name: { show: false }, value: { show: false } },
                            },
                        },
                        stroke: { lineCap: "round" },
                    };

                    const series = [errorPercent];

                    return (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <Card
                                sx={{
                                    height: "250px",
                                    border: `1px solid ${theme.palette.divider}`,
                                    position: "relative",
                                    overflow: "visible",
                                }}
                            >
                                {/* Floating Tag */}
                                <Chip
                                    icon={item.icon}
                                    label={item.cloud}
                                    sx={{
                                        position: "absolute",
                                        top: -14,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        fontWeight: 700,
                                        color: theme.palette.common.white,
                                        bgcolor: item.chipColor,
                                        fontSize: "0.75rem",
                                        px: 1.5,
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        p: 1.5,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    {/* Radial Graph with Overlay */}
                                    <Box sx={{ position: "relative", width: "100%", maxWidth: 220 }}>
                                        <Chart options={options} series={series} type="radialBar" height={200} />

                                        <Box
                                            sx={{
                                                top: 25,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                position: "absolute",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <IconAlertTriangle
                                                size={80}
                                                style={{
                                                    position: "absolute",
                                                    opacity: 0.95,
                                                    color: theme.palette.error.main,
                                                }}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ fontWeight: 700, color: theme.palette.error.main, zIndex: 2, mt: 12 }}
                                            >
                                                ⚠ ALERT
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 800, color: theme.palette.error.main, zIndex: 2 }}
                                            >
                                                <CountUp end={total} duration={2} />
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Bottom Stats */}
                                    <Stack
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                        sx={{ mt: 1, width: "100%" }}
                                    >
                                        <Stack alignItems="center">
                                            <Typography variant="caption">Error</Typography>
                                            <Typography variant="subtitle2" color={theme.palette.error.main}>
                                                <CountUp end={item.error} duration={2} />
                                            </Typography>
                                        </Stack>
                                        <Stack alignItems="center">
                                            <Typography variant="caption">Non-Compliant</Typography>
                                            <Typography variant="subtitle2" color={theme.palette.warning.main}>
                                                <CountUp end={item.nonCompliant} duration={2} />
                                            </Typography>
                                        </Stack>
                                        <Stack alignItems="center">
                                            <Typography variant="caption">Not Applicable</Typography>
                                            <Typography variant="subtitle2" color={theme.palette.info.main}>
                                                <CountUp end={item.notApplicable} duration={2} />
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default ServiceErrorOverview;
