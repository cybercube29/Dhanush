import ScannerPage from '@/app/components/scanner'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function scannerPage() {
    return (
        <>
            <PageContainer title={'scanner'} description={"scanner"}>
                <Breadcrumb childComponent={'scanner'} />
                <ScannerPage />
            </PageContainer>
        </>
    )
}
