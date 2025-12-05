import HeatMap from '@/app/components/heat-map'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function HeatMapPage() {
    return (
        <>
            <PageContainer title={'Heat Map'} description={"Heat Map"}>
                <Breadcrumb childComponent={'Heat Map'} />
                <HeatMap />
            </PageContainer>
        </>
    )
}
