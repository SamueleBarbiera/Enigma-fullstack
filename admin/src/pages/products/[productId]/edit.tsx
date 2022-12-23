import Layout from '@components/layouts/admin'
import CreateOrUpdateProductForm from '@components/product/product-form'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useProductQuery } from '@data/product/product.query'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetServerSideProps } from 'next'

export default function UpdateProductPage() {
    const { t } = useTranslation()
    const { query } = useRouter()
    const { data, isLoading: loading, error } = useProductQuery(query.productId as string)

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">Edit Product</h1>
            </div>
            <CreateOrUpdateProductForm initialValues={data} />
        </>
    )
}
UpdateProductPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['common', 'form'])),
    },
})
