import ServicesContainer from '@/app/components/services-compliances'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function ServicesCompliancesPage() {
    return (
        <>
            <PageContainer title={'Services Compliances'} description={"Services Compliances"}>
                <Breadcrumb childComponent={'Services Compliances'} parentComponent={"Compliances"} parentRoute={'/services-compliances'} />
                <ServicesContainer />
            </PageContainer>
        </>
    )
}
