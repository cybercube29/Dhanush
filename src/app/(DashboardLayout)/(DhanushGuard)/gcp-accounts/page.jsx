import GcpAccounts from '@/app/components/gcp-accounts'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function GCPAccountsPage() {
    return (
        <>
            <PageContainer title={'GCP Accounts'} description={"GCP Accounts"}>
                <Breadcrumb childComponent={'GCP Accounts'} parentComponent={"Asset Management"} parentRoute={'/asset-management'} />
                <GcpAccounts />
            </PageContainer>
        </>
    )
}
