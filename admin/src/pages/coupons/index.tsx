import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import CouponList from '@components/coupon/coupon-list'
import LinkButton from '@components/ui/link-button'
import { useState } from 'react'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useCouponsQuery } from '@data/coupon/use-coupons.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SortOrder } from '@ts-types/generated'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function Coupons() {
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const {
        data,
        isLoading: loading,
        error,
    } = useCouponsQuery({
        limit: 20,
        page,
        text: searchTerm,
        orderBy,
        sortedBy,
    })

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
        setPage(1)
    }
    function handlePagination(current: number) {
        setPage(current)
    }

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) return <ErrorMessage message={error.message} />
    return (
        <>
            <Card className="mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">{t('form:input-label-coupons')}</h1>
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <Search onSearch={handleSearch} />

                    <LinkButton href="/coupons/create" className="h-12 w-full md:w-auto md:ms-6">
                        <span>+ {t('form:button-label-add-coupon')}</span>
                    </LinkButton>
                </div>
            </Card>
            <CouponList coupons={data?.coupons} onPagination={handlePagination} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}

Coupons.authenticate = {
    permissions: adminOnly,
}
Coupons.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common', 'table'])),
    },
})
