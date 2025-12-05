import { Grid, Link, Typography } from '@mui/material'
import StatusCard from './StatusCard'

export default function HeatmapList({ heatmapData, cloudCategory, selectedAsset, selectedScan, scanEntryDate }) {
  return (
    <>
      {heatmapData && heatmapData.length > 0 ? (
        <Grid container spacing={1} justifyContent="center">
          {heatmapData.map((data, index) => {
            const reportUrl = `/asset-management/cloud-scan/reports?cloud=${cloudCategory}&asset=${selectedAsset}&scan=${selectedScan}&scanentrydate=${encodeURIComponent(scanEntryDate)}&framework=${data.frameworkName}&frameworktype=${data.frameworkType}`;

            return (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Link href={reportUrl} style={{ textDecoration: 'none' }}>
                  <StatusCard
                    title={data.frameworkName}
                    passed={data.compliantFC}
                    failed={data.nonCompliantFC}
                  />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
          No data available
        </Typography>
      )}
    </>
  );
}