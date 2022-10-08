import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import ProductList from '@components/product/product-list'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { SortOrder } from '@ts-types/generated'
import { useState } from 'react'
import { useProductsQuery } from '@data/product/products.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SortForm from '@components/common/sort-form'
import CategoryTypeFilter from '@components/product/category-type-filter'
import cn from 'classnames'
import { ArrowDown } from '@components/icons/arrow-down'
import { ArrowUp } from '@components/icons/arrow-up'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1)
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const [visible, setVisible] = useState(false)

    console.log(sortedBy)

    const toggleVisible = () => {
        setVisible((v) => !v)
    }

    const {
        data,
        isLoading: loading,
        error,
    } = useProductsQuery({
        limit: 20,
        page,
        type,
        category,
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
            <Card className="mb-8 flex flex-col">
                <div className="flex w-full flex-col items-center md:flex-row">
                    <div className="mb-4 md:mb-0 md:w-1/4">
                        <h1 className="text-lg font-semibold text-heading">{t('form:input-label-products')}</h1>
                    </div>

                    <div className="flex w-full flex-col items-center ms-auto md:w-3/4">
                        <Search onSearch={handleSearch} />
                    </div>

                    <button
                        className="mt-5 flex items-center text-base font-semibold text-accent md:mt-0 md:ms-5"
                        onClick={toggleVisible}
                    >
                        {t('common:text-filter')}{' '}
                        {visible ? <ArrowUp className="ms-2" /> : <ArrowDown className="ms-2" />}
                    </button>
                </div>

                <div
                    className={cn('flex w-full transition', {
                        'visible h-auto': visible,
                        'invisible h-0': !visible,
                    })}
                >
                    <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
                        <CategoryTypeFilter
                            className="w-full"
                            onCategoryFilter={({ slug }: { slug: string }) => {
                                setCategory(slug)
                            }}
                            onTypeFilter={({ slug }: { slug: string }) => {
                                setType(slug)
                            }}
                        />
                    </div>
                </div>
            </Card>
            <ProductList
                products={data?.products}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
            />
        </>
    )
}

ProductsPage.authenticate = {
    permissions: adminOnly,
}
ProductsPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
