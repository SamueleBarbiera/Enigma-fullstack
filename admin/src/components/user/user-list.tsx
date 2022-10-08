import Pagination from '@components/ui/pagination'
import Image from 'next/image'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { siteSettings } from '@settings/site.settings'
import { UserPaginator, User } from '@ts-types/generated'
import { useMeQuery } from '@data/user/use-me.query'
import { useTranslation } from 'next-i18next'
import { useIsRTL } from '@utils/locals'
import Badge from '@components/ui/badge/badge'
import { AlignType, ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

interface IProps {
    customers: UserPaginator | null | undefined
    onPagination: (current: number) => void
    onSort: (current: any) => void
    onOrder: (current: string) => void
}
const CustomerList = ({ customers, onPagination /* onSort, onOrder*/ }: IProps) => {
    const { data, paginatorInfo } = customers!
    const { t } = useTranslation()
    

    const { data: DataUser } = useMeQuery()

    // const [sortingObj, setSortingObj] = useState<{
    //     sort: SortOrder
    //     column: any | null
    // }>({
    //     sort: SortOrder.Desc,
    //     column: null,
    // })

    // const onHeaderClick = (column: any | null) => ({
    //     onClick: () => {
    //         onSort((currentSortDirection: SortOrder) =>
    //             currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
    //         )

    //         onOrder(column)

    //         setSortingObj({
    //             sort: sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
    //             column: column,
    //         })
    //     },
    // })

    const columns: readonly (ColumnGroupType<User> | ColumnType<User>)[] = [
        {
            title: t('table:table-item-avatar'),
            dataIndex: 'profile',
            key: 'profile',
            align: 'center',
            width: 74,
            render: (profile: any, record: any) => (
                <Image
                    src={profile?.avatar?.thumbnail ?? siteSettings.avatar.placeholder}
                    alt={record?.name}
                    layout="fixed"
                    width={42}
                    height={42}
                    className="overflow-hidden rounded"
                />
            ),
        },
        {
            title: t('table:table-item-title'),
            dataIndex: 'name',
            key: 'name',
            align'left' as AlignType,
        },
        {
            title: t('table:table-item-email'),
            dataIndex: 'email',
            key: 'email',
            align'left' as AlignType,
        },
        {
            title: t('table:table-item-status'),
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (is_active: boolean) => (
                <Badge
                    textKey={is_active ? 'common:text-active' : 'common:text-inactive'}
                    color={is_active ? 'bg-accent' : 'bg-red-500'}
                />
            ),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            render: (id: string, { is_active }: any) => {
                return (
                    <>
                        {DataUser?.id != id && (
                            <ActionButtons
                                id={id}
                                userStatus={true}
                                isUserActive={is_active}
                                showAddWalletPoints={false}
                            />
                        )}
                    </>
                )
            },
        },
    ]

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    columns={columns}
                    emptyText={t('table:empty-table-data')}
                    data={data}
                    rowKey="id"
                    scroll={{ x: 800 }}
                />
            </div>

            {!!paginatorInfo.total && (
                <div className="flex items-center justify-end">
                    <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.currentPage}
                        pageSize={paginatorInfo.perPage}
                        onChange={onPagination}
                    />
                </div>
            )}
        </>
    )
}

export default CustomerList
