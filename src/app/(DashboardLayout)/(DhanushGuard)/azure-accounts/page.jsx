import AzureAccounts from '@/app/components/azure-accounts'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function AzureAccountsPage() {
    return (
        <>
            <PageContainer title={'Azure Accounts'} description={"Azure Accounts"}>
                <Breadcrumb childComponent={'Azure Accounts'} parentComponent={"Asset Management"} parentRoute={'/asset-management'} />
                <AzureAccounts />
            </PageContainer>
        </>
    )
}
