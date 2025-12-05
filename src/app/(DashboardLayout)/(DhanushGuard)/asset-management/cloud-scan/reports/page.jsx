import Reports from '@/app/components/reports'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function ReportPage() {
    return (
        <>
            <PageContainer title={'Reports'} description={"Reports"}>
                <Breadcrumb childComponent={'Reports'} parentComponent={"Cloud Scan"} parentRoute={'/asset-management/cloud-scan'} />
                <Reports />
            </PageContainer>
        </>
    )
}
