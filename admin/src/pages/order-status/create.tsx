import Layout from '@components/layouts/admin'
import CreateOrUpdateOrderStatusForm from '@components/order-status/order-status-form'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function CreateOrderStatusPage() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-create-order-status')}</h1>
            </div>
            <CreateOrUpdateOrderStatusForm />
        </>
    )
}
CreateOrderStatusPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
