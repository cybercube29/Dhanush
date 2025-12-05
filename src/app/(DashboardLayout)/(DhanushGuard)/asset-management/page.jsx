import AssetManagement from '@/app/components/asset-management'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function AssetManagementPage() {
    return (
        <>
            <PageContainer title={'Asset Management'} description={"Asset Management"}>
                <Breadcrumb childComponent={'Asset Management'} />
                <AssetManagement />
            </PageContainer>
        </>
    )
}
