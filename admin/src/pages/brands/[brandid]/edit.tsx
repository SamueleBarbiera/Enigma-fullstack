import Layout from '@components/layouts/admin'
import { useRouter } from 'next/router'
import CreateOrUpdateTypeForm from '@components/brand/brand-form'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTypeQuery } from '@data/type/use-type.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export default function UpdateTypePage() {
    const { query } = useRouter()
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useTypeQuery(query.brandid as string)
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-edit-type')}</h1>
            </div>
            <CreateOrUpdateTypeForm initialValues={data} />
        </>
    )
}
UpdateTypePage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common'])),
    },
})
