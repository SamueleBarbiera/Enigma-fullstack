import Pagination from '@components/ui/pagination'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { ROUTES } from '@utils/routes'
import { Order, OrderStatus, OrderStatusPaginator, PaginatorInfo, SortOrder } from '@ts-types/generated'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

export interface IProps {
    order_statuses: { data: Order; paginatorInfo: PaginatorInfo } | undefined
    onPagination: (key: number) => void
    onSort: (current: any) => void
    onOrder: (current: string) => void
}
const OrderStatusList = ({ order_statuses, onPagination, onSort, onOrder }: IProps) => {
    console.log('🚀 - file: order-status-list.tsx - line 18 - OrderStatusList - order_statuses', order_statuses)
    const { data, paginatorInfo } = order_statuses!
    const { t } = useTranslation()

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
    const columns: readonly (ColumnGroupType<OrderStatus> | ColumnType<OrderStatus>)[] = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 70,
        },
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
            render: (name: string, record: OrderStatus) => (
                <span className="font-semibold" style={{ color: record.color }}>
                    {name}
                </span>
            ),
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-serial')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'serial'}
                    isActive={sortingObj.column === 'serial'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'serial',
            key: 'serial',
            align: 'center',
            onHeaderCell: () => onHeaderClick('serial'),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'right',
            render: (id: string, record: OrderStatus) => (
                <ActionButtons id={id} editUrl={`${ROUTES.ORDER_STATUS}/edit/${record.name}`} />
            ),
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
                    scroll={{ x: 380 }}
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

export default OrderStatusList
