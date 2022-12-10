import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Search from '@components/common/search'
import LinkButton from '@components/ui/link-button'
import { useState } from 'react'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TagList from '@components/tag/tag-list'
import { adminOnly } from '@utils/auth-utils'
import { useTagsQuery } from '@data/tag/use-tags.query'
import { SortOrder } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import { GetServerSideProps } from 'next'

export default function Tags() {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const {
        data,
        isLoading: loading,
        error,
    } = useTagsQuery({
        limit: 10,
        orderBy,
        sortedBy,
        text: searchTerm,
        page,
    })

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }

    function handleSearch({ searchText }: { searchText: string }) {
        setSearchTerm(searchText)
    }
    function handlePagination(current: number) {
        setPage(current)
    }
    return (
        <>
            <Card className="mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:w-1/4 xl:mb-0">
                    <h1 className="text-xl font-semibold text-heading">{t('common:sidebar-nav-item-tags')}</h1>
                </div>

                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <Search onSearch={handleSearch} />

                    <LinkButton href={`${ROUTES.TAGS}/create`} className="h-12 w-full md:w-auto md:ms-6">
                        <span className="block md:hidden xl:block">+ {t('form:button-label-add-tag')}</span>
                        <span className="hidden md:block xl:hidden">+ {t('form:button-label-add')}</span>
                    </LinkButton>
                </div>
            </Card>

            <TagList tags={data.tags} onPagination={handlePagination} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}
Tags.authenticate = {
    permissions: adminOnly,
}
Tags.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['form', 'common', 'table'])),
    },
})
