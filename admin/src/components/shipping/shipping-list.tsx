import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { ROUTES } from '@utils/routes'
import { ShippingInput, SortOrder } from '@ts-types/generated'
import { useTranslation } from 'next-i18next'

import { useState } from 'react'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

export interface IProps {
    shippings: ShippingInput | undefined
    onSort: (current: any) => void
    onOrder: (current: string) => void
}
const ShippingList = ({ shippings, onSort, onOrder }: IProps) => {
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

    const columns: readonly (ColumnGroupType<ShippingInput> | ColumnType<ShippingInput>)[] = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 62,
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
            width: 150,
            onHeaderCell: () => onHeaderClick('name'),
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-amount')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'amount'}
                    isActive={sortingObj.column === 'amount'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            onHeaderCell: () => onHeaderClick('amount'),
        },
        {
            title: t('table:table-item-global'),
            dataIndex: 'is_global',
            key: 'is_global',
            align: 'center',
            render: (value: boolean) => <span className="capitalize">{value.toString()}</span>,
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-shipping-type')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'type'}
                    isActive={sortingObj.column === 'type'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            onHeaderCell: () => onHeaderClick('type'),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            render: (id: string) => (
                <ActionButtons id={id} editUrl={`${ROUTES.SHIPPINGS}/edit/${id}`} deleteModalView="DELETE_SHIPPING" />
            ),
            width: 200,
        },
    ]

    return (
        <div className="mb-8 overflow-hidden rounded shadow">
            <Table
                columns={columns}
                emptyText={t('table:empty-table-data')}
                data={shippings as readonly ShippingInput[] | undefined}
                rowKey="id"
                scroll={{ x: 900 }}
            />
        </div>
    )
}

export default ShippingList
