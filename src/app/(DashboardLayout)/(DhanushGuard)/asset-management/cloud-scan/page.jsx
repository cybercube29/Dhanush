import CloudScan from '@/app/components/scan'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function CloudScanPage() {
    return (
        <>
            <PageContainer title={'Cloud Scan'} description={"Cloud Scan"}>
                <Breadcrumb childComponent={'Cloud Scan'} parentComponent={"Asset Management"} parentRoute={'/asset-management'} />
                <CloudScan />
            </PageContainer>
        </>
    )
}
