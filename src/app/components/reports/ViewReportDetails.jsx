import { Box, CircularProgress, Drawer, IconButton, Typography } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import ReactJson from 'react-json-view';

export default function ViewReportDetails({
    drawerOpen,
    setDrawerOpen,
    scanCommandResultDetails,
    selectedFramework,
    commandResultLoading
}) {

    const safeParse = (text) => {
        try {
            const normalized = text.replace(/'/g, '"');
            return JSON.parse(normalized);
        } catch (e) {
            return null;
        }
    };

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(!drawerOpen)}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 450,
                    padding: 2,
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedFramework}
                </Typography>
                <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                    <IconX />
                </IconButton>
            </Box>

            <Box mt={2} p={2} sx={{ border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                {commandResultLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    scanCommandResultDetails.commonCommands && scanCommandResultDetails.commonCommands.length > 0 ? (
                        scanCommandResultDetails.commonCommands.map((command, index) => {
                            const parsedOutput = safeParse(scanCommandResultDetails.resultText);
                            console.log(parsedOutput)
                            return (
                                <Box key={index} mb={2} p={1}>
                                    <Typography variant="subtitle1" mb={2}><strong>ConfigRule:</strong> {command.command}</Typography>
                                    <Typography variant="subtitle1" mb={2}><strong>Description:</strong> {command.description}</Typography>

                                    <Typography variant="subtitle1" mb={1}><strong>Output:</strong></Typography>
                                    {parsedOutput ? (
                                        <ReactJson
                                            src={parsedOutput}
                                            theme="monokai"
                                            collapsed={false}
                                            enableClipboard={false}
                                            displayDataTypes={false}
                                            style={{ fontSize: '12px', borderRadius: '8px', padding: '8px' }}
                                        />
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            {scanCommandResultDetails.resultText}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        })
                    ) : (
                        <Typography variant="body1" color="textSecondary">No data available</Typography>
                    )
                )}
            </Box>
        </Drawer>
    );
}