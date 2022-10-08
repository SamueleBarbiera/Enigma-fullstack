import Layout from '@components/layouts/admin'
import CreateOrUpdateOrderStatusForm from '@components/order-status/order-status-form'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useOrderStatusQuery } from '@data/order-status/use-order-status.query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export default function UpdateOrderStatusPage() {
    const { query } = useRouter()
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useOrderStatusQuery(query.id as string)
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-edit-order-status')}</h1>
            </div>
            <CreateOrUpdateOrderStatusForm initialValues={data} />
        </>
    )
}
UpdateOrderStatusPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common', 'table'])),
    },
})
