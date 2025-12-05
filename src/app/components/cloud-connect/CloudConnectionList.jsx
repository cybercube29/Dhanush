"use client";

import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { IconPlugConnected } from "@tabler/icons-react";
import Image from "next/image";

export default function CloudConnectionList({ toggleAddDialog }) {
    const cloudProviders = [
        {
            name: "Amazon Web Services",
            description:
                "Connect your AWS to gain visibility into your subscriptions security",
            logo: "/images/logos/aws-logo.png",
            cloudType: "aws",
        },
        {
            name: "Microsoft Azure",
            description:
                "Connect your Microsoft Azure to gain visibility into your subscriptions security",
            logo: "/images/logos/azure-logo.png",
            cloudType: "azure",
        },
        {
            name: "Google Cloud Platform (GCP)",
            description:
                "Connect your GCP to gain visibility into your projects security",
            logo: "/images/logos/gcp-logo.png",
            cloudType: "gcp",
        },
        {
            name: "Oracle Cloud Infrastructure",
            description:
                "Connect your OCI to gain visibility into your projects security",
            logo: "/images/logos/oracle-logo.png",
            cloudType: "oracle",
        },
        {
            name: "Alibaba Cloud",
            description:
                "Connect your Alibaba Cloud to gain visibility into your projects security",
            logo: "/images/logos/alibaba-logo1.png",
            cloudType: "alibaba",
        },
        {
            name: "VMware vSphere",
            description:
                "Connect Wiz to your Sphere Center to gain visibility into your hybrid-cloud",
            logo: "/images/logos/vmware-logo.png",
            cloudType: "vmware",
        },
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            {cloudProviders.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Image
                                src={item.logo}
                                alt={item.name}
                                width={32}
                                height={32}
                                style={{ objectFit: "contain" }}
                            />
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                {item.name}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary" mb={2}>
                            {item.description}
                        </Typography>

                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<IconPlugConnected size={15} />}
                            onClick={() => toggleAddDialog({ cloudType: item.cloudType })}
                        >
                            Connect
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
