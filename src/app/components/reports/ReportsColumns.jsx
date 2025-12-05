import { Box, Button, Chip, Typography } from '@mui/material';
import { IconEye, IconRefresh } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import { Cancel, Error, ReportProblem } from '@mui/icons-material';


const columnHelper = createColumnHelper();

export const getReportsColumns = ({ onRetestClick, onViewClick }) => [
    columnHelper.accessor('index', {
        header: () => 'Index',
        cell: (info) => {
            const value = info.getValue();
            const displayValue = value.includes('$') ? value.split('$')[0] : value;

            return (
                <Typography variant="subtitle1" color="textSecondary">
                    {displayValue}
                </Typography>
            );
        }
    }),
    columnHelper.accessor('description', {
        header: () => 'Description',
        cell: info => (
            <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{
                    fontSize: '0.75rem',
                    maxWidth: '600px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }}
            >
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor('resourceID', {
        header: () => 'Resource',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                {info.getValue()}
            </Typography>
        )
    }),
    columnHelper.accessor('complianceStatus', {
        header: () => 'Status',
        cell: info => (
            <Chip
                size="small"
                icon={
                    (() => {
                        switch (info.getValue()) {
                            case "ERROR":
                                return <Error style={{ fontSize: "1rem", fill: "#ff0000ff" }} />;
                            case "NON_COMPLIANT":
                                return <ReportProblem sx={{ fontSize: "1rem", fill: "#ff0000ff" }} />;
                            case "NOT_APPLICABLE":
                                return <Cancel sx={{ fontSize: "1rem", fill: "#ff0000ff" }} />;
                            default:
                                return undefined; // baaki pe icon nahi
                        }
                    })()
                }
                sx={{
                    fontSize: ".9rem",
                    bgcolor: (theme) => {
                        switch (info.getValue()) {
                            case "COMPLIANT": return theme.palette.success.light;
                            case "PENDING": return "#FFFF8F";
                            case "NOT_APPLICABLE": return theme.palette.info.light;
                            case "ERROR": return theme.palette.error.light;
                            case "NON_COMPLIANT": return theme.palette.warning.light;
                            default: return theme.palette.secondary.light;
                        }
                    },
                    color: (theme) => {
                        switch (info.getValue()) {
                            case "COMPLIANT": return "#11ab00ff";
                            case "PENDING": return "rgba(158, 142, 1, 1)";
                            case "NOT_APPLICABLE": return "#c42847ad";
                            case "ERROR": return "#ff0000ff";
                            case "NON_COMPLIANT": return "#ff6d00";
                            default: return "#4800ffff";
                        }
                    },
                    borderRadius: "2px",
                }}
                label={(() => {
                    switch (info.getValue()) {
                        case "COMPLIANT": return "Compliant";
                        case "PENDING": return "Pending";
                        case "NOT_APPLICABLE": return "Not Applicable";
                        case "ERROR": return "Error";
                        case "NON_COMPLIANT": return "Non Compliant";
                        default: return info.getValue();
                    }
                })()}
            />
        ),
    }),
    {
        id: 'actions',
        header: () => 'Actions',
        cell: info => (
            <Box display="flex" justifyContent={'space-between'} gap={1}>
                <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    sx={{ fontSize: '.7rem', padding: '.1rem 0.3rem', textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={() => onRetestClick(info.row.original)}
                >
                    <IconRefresh size={14} /> Re-Test
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ fontSize: '.7rem', padding: '.1rem 0.3rem', textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={() => onViewClick(info.row.original)}
                >
                    <IconEye size={14} /> View
                </Button>
            </Box>
        ),
    },
];
