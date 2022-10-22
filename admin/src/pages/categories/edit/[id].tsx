import Layout from '@components/layouts/admin'
import CreateOrUpdateCategoriesForm from '@components/category/category-form'
import { useRouter } from 'next/router'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useCategoryQuery } from '@data/category/use-category.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export default function UpdateCategoriesPage() {
    const { query } = useRouter()
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useCategoryQuery(query.id as string)

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }

    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-edit-category')}</h1>
            </div>

            <CreateOrUpdateCategoriesForm initialValues={data} />
        </>
    )
}

UpdateCategoriesPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common'])),
    },
})
