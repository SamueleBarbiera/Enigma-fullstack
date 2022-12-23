import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShopList from '@components/shop/shop-list'
import { useState } from 'react'
import Search from '@components/common/search'
import { adminOnly } from '@utils/auth-utils'
import { useShopsQuery } from '@data/shop/use-shops.query'
import { SortOrder } from '@ts-types/generated'
import { GetServerSideProps } from 'next'

export default function AllShopPage() {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const {
        data,
        isLoading: loading,
        error,
    } = useShopsQuery({
        text: searchTerm,
        limit: 10,
        page,
        orderBy,
        sortedBy,
    })

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
    }
    function handlePagination(current: any) {
        setPage(current)
    }
    return (
        <>
            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-lg font-semibold text-heading">{t('common:sidebar-nav-item-shops')}</h1>
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-1/2 md:flex-row">
                    <Search onSearch={handleSearch} />
                </div>
            </Card>
            <ShopList shops={data?.shops} onPagination={handlePagination} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}
AllShopPage.authenticate = {
    permissions: adminOnly,
}
AllShopPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
