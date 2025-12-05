import CloudScan from '@/app/components/scan'
import Breadcrumb from '@/app/components/shared/Breadcrumb'
import PageContainer from '@/app/components/shared/PageContainer'
import React from 'react'

export default function page() {
    return (
        <>
            <PageContainer title={'Compliances'} description={"Compliances"}>
                <Breadcrumb childComponent={'Compliances'} />
                <CloudScan />
            </PageContainer>
        </>
    )
}
