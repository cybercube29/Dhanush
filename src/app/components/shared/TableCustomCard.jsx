'use client'
import { Box, Button, Card, CardHeader, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';

const TableCustomCard = ({ title, refreshTableData, addData, children }) => {

    const customizer = useSelector((state) => state.customizer);
    const theme = useTheme();
    const borderColor = theme.palette.divider;
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Card
            sx={{ padding: 0, border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none' }}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            <CardHeader
                sx={{
                    padding: "8px 16px 8px 8px",
                    "& .MuiCardHeader-title": {
                        fontSize: "1.1rem !important",
                        fontWeight: 700,
                        textTransform: 'uppercase'
                    },
                }}
                title={
                    <Box display={'flex'} alignItems={'center'} gap={1}>
                        {title}
                        {refreshTableData ? (
                            <Tooltip title={`Refresh ${title}`}>
                                <IconButton color='primary' size='small' onClick={refreshTableData}>
                                    <IconRefresh size={14} />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                    </Box>
                }
                action={
                    <Box display={'flex'} alignItems={'center'}>
                        {addData ? (
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ marginX: 1, display: 'flex', alignItems: 'center', gap: 0.3 }}
                                onClick={addData}
                            >
                                <IconPlus size={13} /> Add New
                            </Button>
                        ) : null}
                        <TextField
                            placeholder="Search..."
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: '150px',
                                '& .MuiOutlinedInput-root': {
                                    padding: '2px',
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '5px 10px',
                                },
                            }}
                        />
                    </Box>
                }
            />
            <Divider />
            {children({ searchQuery })}
        </Card>
    );
};

export default TableCustomCard;