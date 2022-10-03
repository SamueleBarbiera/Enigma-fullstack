import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import WithdrawList from '@components/withdraw/withdraw-list'
import { adminOnly } from '@utils/auth-utils'
import { useWithdrawsQuery } from '@data/withdraw/use-withdraws.query'
import { useState } from 'react'
import { SortOrder } from '@ts-types/generated'

export default function WithdrawsPage() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [orderBy, setOrder] = useState('created_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const {
        data,
        isLoading: loading,
        error,
    } = useWithdrawsQuery({
        limit: 10,
        page,
        sortedBy,
        orderBy,
    })

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
                    <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 md:mb-0 md:w-1/4">
                            <h1 className="text-lg font-semibold text-heading">
                                {t('common:sidebar-nav-item-withdraws')}
                            </h1>
                        </div>
                    </Card>
                    <WithdrawList
                        withdraws={data?.withdraws}
                        onPagination={handlePagination}
                        onOrder={setOrder}
                        onSort={setColumn}
                    />{' '}
                </>
            )}
        </>
    )
}
WithdrawsPage.authenticate = {
    permissions: adminOnly,
}
WithdrawsPage.Layout = Layout

export const getServerSideProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
    },
})
