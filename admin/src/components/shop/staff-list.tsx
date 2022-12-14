import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { useTranslation } from 'next-i18next'

import Pagination from '@components/ui/pagination'
import { UserPaginator, SortOrder, User } from '@ts-types/generated'
import { useState } from 'react'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

type IProps = {
    staffs: UserPaginator | null | undefined
    onPagination: (current: number) => void
    onSort: (current: any) => void
    onOrder: (current: string) => void
}

const StaffList = ({ staffs, onPagination, onSort, onOrder }: IProps) => {
    const { t } = useTranslation()
    const { data, paginatorInfo } = staffs!

    const [sortingObj, setSortingObj] = useState<{
        sort: SortOrder
        column: string | null
    }>({
        sort: SortOrder.Desc,
        column: null,
    })

    const onHeaderClick = (column: string | null) => ({
        onClick: () => {
            onSort((currentSortDirection: SortOrder) =>
                currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
            )
            onOrder(column!)

            setSortingObj({
                sort: sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
                column: column,
            })
        },
    })

    const columns: readonly (ColumnGroupType<User> | ColumnType<User>)[] = [
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-title')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'}
                    isActive={sortingObj.column === 'name'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            onHeaderCell: () => onHeaderClick('name'),
        },
        {
            title: t('table:table-item-email'),
            dataIndex: 'email',
            key: 'email',
            align: 'left',
        },
        {
            title: t('table:table-item-status'),
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            render: (is_active: boolean) => (is_active ? t('common:text-active') : t('common:text-inactive')),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'right',
            render: (id: string) => {
                return <ActionButtons id={id} deleteModalView="DELETE_STAFF" />
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
                        showLessItems
                    />
                </div>
            )}
        </>
    )
}

export default StaffList
