import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import CustomerList from '@components/user/user-list'
import LinkButton from '@components/ui/link-button'
import { useState } from 'react'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useUsersQuery } from '@data/user/use-users.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ROUTES } from '@utils/routes'
import { SortOrder } from '@ts-types/generated'

export default function Customers() {
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const { t } = useTranslation()
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)

    const {
        data,
        isLoading: loading,
        error,
    } = useUsersQuery({
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
    function handlePagination(current: any) {
        setPage(current)
    }

    return (
        <>
            {loading ? (
                <Loader text={t('common:text-loading')} />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <>
                    <Card className="mb-8 flex flex-col items-center md:flex-row">
                        <div className="mb-4 md:mb-0 md:w-1/4">
                            <h1 className="text-lg font-semibold text-heading">{t('form:input-label-customers')}</h1>
                        </div>

                        <div className="flex w-full items-center ms-auto md:w-3/4">
                            <Search onSearch={handleSearch} />
                            <LinkButton href={`${ROUTES.USERS}/create`} className="ms-4 h-12 md:ms-6">
                                <span>+ {t('form:button-label-add-customer')}</span>
                            </LinkButton>
                        </div>
                    </Card>

                    <CustomerList
                        customers={data?.users}
                        onPagination={handlePagination}
                        onOrder={setOrder}
                        onSort={setColumn}
                    />
                </>
            )}
        </>
    )
}
Customers.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
})
