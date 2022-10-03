import Layout from '@components/layouts/admin'
import CreateOrUpdateCategoriesForm from '@components/category/category-form'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function CreateCategoriesPage() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-create-category')}</h1>
            </div>
            <CreateOrUpdateCategoriesForm />
        </>
    )
}

CreateCategoriesPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['form', 'common'])),
    },
})
