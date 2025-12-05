'use client';
import { Cancel, CheckCircle, Cloud, Error, HourglassEmpty, ReportProblem } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from "@mui/material";

const ReportFilterWidgets = ({ statusDataWidgets, onCardClick }) => {

    const topcards = [

        {
            title: "Error",
            status: "ERROR",
            digits: statusDataWidgets?.error || 0,
            bgcolor: "warning",
            textColor: "#ff0000ff",
            icon: <Error />
        },
        {
            title: "Non Compliant",
            status: "NON_COMPLIANT",
            digits: statusDataWidgets?.nonCompliant || 0,
            bgcolor: "error",
            textColor: "#ff0000ff",
            icon: <ReportProblem />
        },
        {
            title: "All",
            status: null, // No filtering for "All"
            digits: statusDataWidgets?.total || 0,
            bgcolor: "primary",
            textColor: "#4800ffff",
            icon: <Cloud />
        },
        {
            title: "Compliant",
            status: "COMPLIANT",
            digits: statusDataWidgets?.compliant || 0,
            bgcolor: "success",
            textColor: "#11ab00ff",
            icon: <CheckCircle />
        },
        {
            title: "Pending",
            status: "PENDING",
            digits: statusDataWidgets?.pending || 0,
            bgcolor: "#FFFF8F",
            textColor: "rgba(158, 142, 1, 1)",
            icon: <HourglassEmpty />
        },
        {
            title: "Not Applicable",
            status: "NOT_APPLICABLE",
            digits: statusDataWidgets?.notApplicable || 0,
            bgcolor: "info",
            textColor: "#c42847ad",
            icon: <Cancel />
        }
    ];

    return (
        <Grid container spacing={2}>
            {topcards.map((topcard, i) => {
                const backgroundColor = topcard.bgcolor.startsWith("#") ? topcard.bgcolor : `${topcard.bgcolor}.light`;
                const textColor = topcard.textColor || `${topcard.bgcolor}.main`;

                return (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={2}>
                        <Box
                            bgcolor={backgroundColor}
                            textAlign="center"
                            borderRadius={2}
                            sx={{ cursor: "pointer", py: 1, px: 2 }}
                            onClick={() => onCardClick(topcard.status)}
                        >
                            <Stack direction={"row"} alignItems={'center'}>
                                <Stack color={textColor} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginRight: '.5rem' }}>
                                    {topcard.icon}
                                </Stack>

                                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={"100%"}>
                                    <Typography
                                        color={textColor}
                                        mt={1}
                                        variant="subtitle2"
                                        fontWeight={600}
                                        sx={{ fontSize: '.7rem' }}
                                    >
                                        {topcard.title}
                                    </Typography>
                                    <Typography
                                        color={textColor}
                                        variant="subtitle2"
                                        fontWeight={600}
                                        sx={{ fontSize: '.7rem' }}
                                    >
                                        {topcard.digits}
                                    </Typography>
                                </Box>
                            </Stack>

                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ReportFilterWidgets;