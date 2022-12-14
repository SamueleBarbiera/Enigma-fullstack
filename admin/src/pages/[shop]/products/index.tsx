/* eslint-disable @typescript-eslint/unbound-method */
import Card from '@components/common/card'
import Search from '@components/common/search'
import ProductList from '@components/product/product-list'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShopLayout from '@components/layouts/shop'
import { useRouter } from 'next/router'
import LinkButton from '@components/ui/link-button'
import { adminOwnerAndStaffOnly } from '@utils/auth-utils'
import { useShopQuery } from '@data/shop/use-shop.query'
import { useProductsQuery } from '@data/product/products.query'
import { SortOrder } from '@ts-types/generated'
import CategoryTypeFilter from '@components/product/category-type-filter'
import cn from 'classnames'
import { ArrowDown } from '@components/icons/arrow-down'
import { ArrowUp } from '@components/icons/arrow-up'
import { useModalAction } from '@components/ui/modal/modal.context'
import { MoreIcon } from '@components/icons/more-icon'
import Button from '@components/ui/button'
import { GetServerSideProps } from 'next'

export default function ProductsPage() {
    const {
        query: { shop },
    } = useRouter()
    const { data: shopData, isLoading: fetchingShop } = useShopQuery(shop as string)
    const shopId = shopData?.shop.id
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [type, setType] = useState('')
    const [page, setPage] = useState(1)
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const [visible, setVisible] = useState(false)
    const { openModal } = useModalAction()

    const toggleVisible = () => {
        setVisible((v) => !v)
    }

    const {
        data,
        isLoading: loading,
        error,
    } = useProductsQuery(
        {
            text: searchTerm,
            limit: 10,
            shop_id: Number(shopId),
            type,
            orderBy,
            sortedBy,
            page,
        },
        {
            enabled: Boolean(shopId),
        }
    )

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
    }
    function handlePagination(current: number) {
        setPage(current)
    }

    if (loading || fetchingShop) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`??? Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <>
            <Card className="mb-8 flex flex-col">
                <div className="flex w-full flex-col items-center md:flex-row">
                    <div className="mb-4 md:mb-0 md:w-1/4">
                        <h1 className="text-lg font-semibold text-heading">{t('form:input-label-products')}</h1>
                    </div>

                    <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
                        <div className="flex w-full items-center">
                            <Search onSearch={handleSearch} />

                            <LinkButton href={`/${shop as string}/products/create`} className="h-12 ms-4 md:ms-6">
                                <>
                                    <span className="hidden md:block">+ {t('form:button-label-add-product')}</span>
                                    <span className="md:hidden">+ {t('form:button-label-add')}</span>
                                </>
                            </LinkButton>
                        </div>
                        {/* 
                        <button
                            className="mt-5 flex items-center text-base font-semibold text-accent md:mt-0 md:ms-5"
                            onClick={toggleVisible}
                        >
                            {t('common:text-filter')}{' '}
                            {visible ? <ArrowUp className="ms-2" /> : <ArrowDown className="ms-2" />}
                        </button> */}
                    </div>
                </div>
                {/* 
                <div
                    className={cn('flex w-full transition', {
                        'visible h-auto': visible,
                        'invisible h-0': !visible,
                    })}
                >
                    <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
                        <CategoryTypeFilter
                            className="w-full"
                            onTypeFilter={(slug: string) => {
                                setType(slug)
                            }}
                        />
                    </div>
                </div> */}
            </Card>
            <ProductList products={data} onPagination={handlePagination} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}
ProductsPage.authenticate = {
    permissions: adminOwnerAndStaffOnly,
}
ProductsPage.Layout = ShopLayout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
