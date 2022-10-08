import Layout from '@components/layouts/admin'
import CouponCreateOrUpdateForm from '@components/coupon/coupon-form'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useCouponQuery } from '@data/coupon/use-coupon.query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export default function UpdateCouponPage() {
    const { query } = useRouter()
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useCouponQuery(query.id as string)
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) return <ErrorMessage message={error.message} />
    return (
        <>
            <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
                <h1 className="text-lg font-semibold text-heading">{t('form:form-title-edit-coupon')}</h1>
            </div>
            <CouponCreateOrUpdateForm initialValues={data} />
        </>
    )
}

UpdateCouponPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common'])),
    },
})
