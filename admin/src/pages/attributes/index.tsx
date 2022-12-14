import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import AttributeList from '@components/attribute/attribute-list'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useAttributesQuery } from '@data/attributes/use-attributes.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SortOrder } from '@ts-types/generated'
import { useState } from 'react'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function AttributePage() {
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder | undefined>(SortOrder.Desc)

    const { data, isLoading: loading, error } = useAttributesQuery({ orderBy, sortedBy })
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <>
            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">{t('common:sidebar-nav-item-attributes')}</h1>
                </div>
            </Card>
            <AttributeList attributes={data} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})

AttributePage.authenticate = {
    permissions: adminOnly,
}
AttributePage.Layout = Layout
