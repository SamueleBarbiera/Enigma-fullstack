import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import TypeList from '@components/brand/brand-list'
import ErrorMessage from '@components/ui/error-message'
import LinkButton from '@components/ui/link-button'
import Loader from '@components/ui/loader/loader'
import { SortOrder } from '@ts-types/generated'
import { SetStateAction, useState } from 'react'
import { useTypesQuery } from '@data/type/use-types.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ROUTES } from '@utils/routes'
import { adminOnly } from '@utils/auth-utils'
import { GetServerSideProps } from 'next'

export default function TypesPage() {
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [page, setPage] = useState(1)
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const [searchTerm, setSearchTerm] = useState('')
    const {
        data,
        isLoading: loading,
        error,
    } = useTypesQuery({
        limit: 20,
        page,
        text: searchTerm,
        orderBy,
        sortedBy,
    })

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
        setPage(1)
    }

    function handlePagination(current: SetStateAction<number>) {
        setPage(current)
    }

    return (
        <>
            <Card className="mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:w-1/4 xl:mb-0">
                    <h1 className="text-xl font-semibold text-heading">{t('common:sidebar-nav-item-groups')}</h1>
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <Search onSearch={handleSearch} />

                    <LinkButton href={`${ROUTES.BRANDS}/create`} className="h-12 w-full md:w-auto md:ms-6">
                        <span className="block md:hidden xl:block">+ {t('form:button-label-add-group')}</span>
                        <span className="hidden md:block xl:hidden">+ {t('form:button-label-add')}</span>
                    </LinkButton>
                </div>
            </Card>
            <TypeList types={data?.types} onOrder={setOrder} onSort={setColumn} onPagination={handlePagination} />
        </>
    )
}
TypesPage.authenticate = {
    permissions: adminOnly,
}

TypesPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
