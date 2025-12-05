'use client';
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import CountUp from 'react-countup';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Stack,
    Typography,
    Box,
    Card,
    CardContent,
    Chip,
    Skeleton,
} from '@mui/material';
import { IconBrandGoogle, IconBrandWindows, IconBrandAws } from '@tabler/icons-react';
import { DashboardGroupDataAPI } from '@/axios/apis';

const ServiceDataOverview = () => {
    const theme = useTheme();
    const [cloudData, setCloudData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await DashboardGroupDataAPI();
                if (Array.isArray(res)) {
                    setCloudData(res);
                } else if (Array.isArray(res?.data)) {
                    setCloudData(res.data);
                } else {
                    setCloudData([]);
                }
            } catch (err) {
                console.error("Error fetching service overview:", err);
                setCloudData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🎨 Field mapping
    const fieldMapping = [
        { key: "serviceCount", label: "Services", color: theme.palette.error.main },
        { key: "scanCount", label: "Scans", color: theme.palette.warning.main },
        { key: "profileCount", label: "Assets", color: theme.palette.info.main },
    ];

    // 🎨 Map API data -> UI format
    const mappedData = Array.isArray(cloudData)
        ? cloudData.map((item) => {
            let icon, color, label;
            switch (item.cloudType?.toLowerCase()) {
                case "aws":
                    icon = <IconBrandAws size={16} />;
                    color = theme.palette.error.main;
                    label = "AWS";
                    break;
                case "azure":
                    icon = <IconBrandWindows size={16} />;
                    color = theme.palette.warning.main;
                    label = "Azure";
                    break;
                case "gcp":
                    icon = <IconBrandGoogle size={16} />;
                    color = theme.palette.info.main;
                    label = "GCP";
                    break;
                default:
                    icon = null;
                    color = theme.palette.grey[500];
                    label = item.cloudType;
            }

            const series = fieldMapping.map((f) => item[f.key] || 0);
            const total = series.reduce((a, b) => a + b, 0);

            return { cloud: label, icon, color, raw: item, series, total };
        })
        : [];

    const order = { AWS: 1, Azure: 2, GCP: 3 };
    const sortedData = [...mappedData].sort((a, b) => {
        return (order[a.cloud] || 99) - (order[b.cloud] || 99);
    });

    return (
        <Grid container spacing={3}>
            {loading
                ? [1, 2, 3].map((n) => (
                    <Grid item xs={12} sm={6} md={4} key={n}>
                        <Card sx={{ height: "200px", borderRadius: 3, p: 2 }}>
                            <Skeleton
                                variant="rounded"
                                animation="wave"
                                width={60}
                                height={24}
                                sx={{ mx: "auto", mb: 2 }}
                            />
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Skeleton variant="circular" animation="wave" width={90} height={90} />
                                <Stack sx={{ flex: 1 }}>
                                    <Skeleton variant="text" animation="wave" width="60%" height={28} />
                                    <Skeleton variant="text" animation="wave" width="40%" height={20} />
                                </Stack>
                            </Stack>
                            <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
                                <Skeleton variant="text" animation="wave" width={40} height={20} />
                                <Skeleton variant="text" animation="wave" width={40} height={20} />
                                <Skeleton variant="text" animation="wave" width={40} height={20} />
                            </Stack>
                        </Card>
                    </Grid>
                ))
                : sortedData.length > 0
                    ? sortedData.map((item, idx) => {
                        const chartOptions = {
                            chart: { type: "donut", toolbar: { show: false }, sparkline: { enabled: true } },
                            labels: fieldMapping.map((f) => f.label),
                            colors: fieldMapping.map((f) => f.color),
                            plotOptions: { pie: { donut: { size: "70%", labels: { show: false } } } },
                            dataLabels: { enabled: false },
                            legend: { show: false },
                        };

                        return (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Card
                                    sx={{
                                        height: "200px",
                                        border: `1px solid ${theme.palette.divider}`,
                                        position: "relative",
                                        overflow: "visible",
                                    }}
                                >
                                    {/* Floating Cloud Tag */}
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
                                            bgcolor: item.color,
                                            fontSize: "0.75rem",
                                            px: 1.5,
                                        }}
                                    />

                                    <CardContent sx={{ p: 1.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                        {/* Chart + Total */}
                                        <Stack direction="row" spacing={2} alignItems="center" flexGrow={1}>
                                            <Box sx={{ width: 90, height: 90 }}>
                                                <Chart
                                                    options={chartOptions}
                                                    series={item.series}
                                                    type="donut"
                                                    height="90"
                                                    width="90"
                                                />
                                            </Box>

                                            <Stack alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
                                                <Typography variant="h5" sx={{ fontWeight: 800, color: item.color }}>
                                                    <CountUp end={item.total} duration={2} />
                                                </Typography>
                                                <Typography variant="caption" sx={{ fontWeight: 600, color: item.color }}>
                                                    ⚡ TOTAL COUNT
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                        {/* Bottom Stats */}
                                        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{ mt: 1 }}>
                                            {fieldMapping.map((f) => (
                                                <Stack alignItems="center" key={f.key}>
                                                    <Typography variant="caption">{f.label}</Typography>
                                                    <Typography variant="subtitle2" sx={{ color: f.color }}>
                                                        <CountUp end={item.raw[f.key] || 0} duration={2} />
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                    : (
                        <Typography variant="body2" sx={{ m: 2 }}>
                            No data available
                        </Typography>
                    )}
        </Grid>
    );
};

export default ServiceDataOverview;
