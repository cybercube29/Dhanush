import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Tooltip } from '@mui/material';

const StatusCard = ({ title, passed, failed }) => {
    const progress = (passed + failed) === 0 ? 0 : (passed / (passed + failed)) * 100;

    const getColor = (value) => {
        if (value > 80) return '#00C853';
        if (value > 60) return '#FFA000';
        return '#E63946';
    };

    return (
        <Card
            sx={{
                border: `1px solid ${getColor(progress)}`,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2C2C54',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    margin: '0 auto',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
                    {title.substring(0, 3).toUpperCase()}
                </Typography>
            </Box>

            {/* Title */}
            <Tooltip title={title} arrow>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', marginTop: 1, marginBottom: 1, fontSize: '0.8rem' }}
                >
                    {title}
                </Typography>
            </Tooltip>

            {/* Passed/Failed Count */}
            <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                Passed: <span style={{ color: '#01ff6bc6' }}>{passed}</span> | Failed:{' '}
                <span style={{ color: '#ff0015ff' }}>{failed}</span>
            </Typography>

            {/* Progress Bar */}
            <Box
                sx={{
                    marginTop: 1,
                    position: 'relative',
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: '#E0E0E0',
                }}
            >
                <Box
                    sx={{
                        width: `${progress}%`,
                        height: '100%',
                        borderRadius: 2,
                        backgroundColor: getColor(progress),
                    }}
                />
            </Box>
        </Card>
    );
};

export default StatusCard;