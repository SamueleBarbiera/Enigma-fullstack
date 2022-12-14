import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import OrderList from '@components/order/order-list'
import { useState } from 'react'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useOrdersQuery } from '@data/order/use-orders.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SortOrder } from '@ts-types/generated'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)

    const {
        data,
        isLoading: loading,
        error,
    } = useOrdersQuery({
        limit: 20,
        page,
        text: searchTerm,
    })
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
        setPage(1)
    }
    function handlePagination(current: any) {
        setPage(current)
    }

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
                    <h1 className="text-lg font-semibold text-heading">{t('form:input-label-orders')}</h1>
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
                    <Search onSearch={handleSearch} />
                </div>
            </Card>

            <OrderList orders={data?.orders} onPagination={handlePagination} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}

Orders.authenticate = {
    permissions: adminOnly,
}

Orders.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
