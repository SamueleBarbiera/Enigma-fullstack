import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import OrderStatusList from '@components/order-status/order-status-list'
import ErrorMessage from '@components/ui/error-message'
import LinkButton from '@components/ui/link-button'
import Loader from '@components/ui/loader/loader'
import { ROUTES } from '@utils/routes'
import { useOrderStatusesQuery } from '@data/order-status/use-order-statuses.query'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SortOrder } from '@ts-types/generated'
import { adminOnly } from '@utils/auth-utils'

export default function OrderStatusPage() {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [orderBy, setOrder] = useState('serial')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const {
        data,
        isLoading: loading,
        error,
    } = useOrderStatusesQuery({
        limit: 100,
        page,
        text: searchTerm,
        orderBy,
        sortedBy,
    })
    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) return <ErrorMessage message={error.message} />

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
        setPage(1)
    }
    function handlePagination(current: any) {
        setPage(current)
    }
    return (
        <>
            <Card className="mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:w-1/4 xl:mb-0">
                    <h1 className="text-lg font-semibold text-heading">{t('form:input-label-order-status')}</h1>
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <Search onSearch={handleSearch} />

                    <LinkButton href={`${ROUTES.ORDER_STATUS}/create`} className="h-12 w-full md:w-auto md:ms-6">
                        <span>+ {t('form:button-label-add-order-status')}</span>
                    </LinkButton>
                </div>
            </Card>

            {loading ? null : (
                <OrderStatusList
                    order_statuses={data?.order_statuses}
                    onPagination={handlePagination}
                    onOrder={setOrder}
                    onSort={setColumn}
                />
            )}
        </>
    )
}

OrderStatusPage.authenticate = {
    permissions: adminOnly,
}

OrderStatusPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
})
