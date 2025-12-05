import AwsAccounts from '@/app/components/aws-accounts'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'

export default function AwsAccountsPage() {
    return (
        <>
            <PageContainer title={'AWS Accounts'} description={"AWS Accounts"}>
                <Breadcrumb childComponent={'AWS Accounts'} parentComponent={"Asset Management"} parentRoute={'/asset-management'} />
                <AwsAccounts />
            </PageContainer>
        </>
    )
}
