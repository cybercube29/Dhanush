'use client';

import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { IconArrowBack, IconPlugConnected } from '@tabler/icons-react';
import Image from 'next/image';

export default function AssetsList({ handleToggleAssets, toggleAddAssetDialog }) {

    const cloudProviders = [
        {
            name: 'Amazon Web Services',
            description: 'Connect your AWS to gain visibility into your subscriptions security',
            logo: '/images/logos/aws-logo.png',
            provider: 'aws',
        },
        {
            name: 'Microsoft Azure',
            description: 'Connect your Microsoft Azure to gain visibility into your subscriptions security',
            logo: '/images/logos/azure-logo.png',
            provider: 'azure',
        },
        {
            name: 'Google Cloud Platform (GCP)',
            description: 'Connect your GCP to gain visibility into your projects security',
            logo: '/images/logos/gcp-logo.png',
            provider: 'gcp',
        },
        {
            name: 'Oracle Cloud Infrastructure',
            description: 'Connect your OCI to gain visibility into your projects security',
            logo: '/images/logos/oracle-logo.png',
            provider: 'oracle',
        },
        {
            name: 'Alibaba Cloud',
            description: 'Connect your Alibaba Cloud to gain visibility into your projects security',
            logo: '/images/logos/alibaba-logo1.png',
            provider: 'alibaba',
        },
        {
            name: 'VMware vSphere',
            description: 'Connect Wiz to your Sphere Center to gain visibility into your hybrid-cloud',
            logo: '/images/logos/vmware-logo.png',
            provider: 'vmware',
        },
    ];

    return (
        <>
            <Box mb={2}>
                <Button
                    variant="contained"
                    size='small'
                    startIcon={<IconArrowBack size={15} />}
                    onClick={handleToggleAssets}
                >
                    Back to Asset List
                </Button>
            </Box>
            <Grid container spacing={2}>
                {cloudProviders.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        p: 0.5,
                                        borderRadius: 1,
                                        border: '1px solid #ccc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 1.5,
                                        backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <Image
                                        src={item.logo}
                                        alt={`${item.name} logo`}
                                        width={24}
                                        height={24}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="h6">{item.name}</Typography>
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary" mb={2}>
                                {item.description}
                            </Typography>

                            <Button
                                variant="contained"
                                size='small'
                                startIcon={<IconPlugConnected size={15} />}
                                onClick={() => toggleAddAssetDialog(item.provider)}
                            >
                                Connect
                            </Button>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </>
    )
}
