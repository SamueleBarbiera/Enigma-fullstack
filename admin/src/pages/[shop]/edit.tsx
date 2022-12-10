import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShopForm from '@components/shop/shop-form'
import ShopLayout from '@components/layouts/shop'
import { adminAndOwnerOnly } from '@utils/auth-utils'
import { useShopQuery } from '@data/shop/use-shop.query'
import { GetServerSideProps } from 'next'

export default function UpdateShopPage() {
    const { query } = useRouter()
    const { shop } = query
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useShopQuery(shop as string)
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-edit-shop')}</h1>
            </div>
            <ShopForm initialValues={data?.shop} />
        </>
    )
}
UpdateShopPage.authenticate = {
    permissions: adminAndOwnerOnly,
}
UpdateShopPage.Layout = ShopLayout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common'])),
    },
})
