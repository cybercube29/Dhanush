import CloudConnection from '@/app/components/cloud-connect'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function CloudConnectPage() {
    return (
        <>
            <PageContainer title={'Cloud Connect'} description={"Cloud Connect"}>
                <Breadcrumb childComponent={'Cloud Connect'} />
                <CloudConnection />
            </PageContainer>
        </>
    )
}
