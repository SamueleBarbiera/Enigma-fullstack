import { useState } from 'react'
import Pagination from '@components/ui/pagination'
import Image from 'next/image'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { siteSettings } from '@settings/site.settings'
import { useTranslation } from 'next-i18next'

import Badge from '@components/ui/badge/badge'
import { Shop, ShopPaginator, SortOrder } from '@ts-types/generated'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

interface IProps {
    shops: ShopPaginator | null | undefined
    onPagination: (current: number) => void
    onSort: (current: any) => void
    onOrder: (current: string) => void
}

const ShopList = ({ shops, onPagination, onSort, onOrder }: IProps) => {
    const { data, paginatorInfo } = shops ?? {}
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

    const columns: readonly (ColumnGroupType<Shop> | ColumnType<Shop>)[] = [
        {
            title: t('table:table-item-logo'),
            dataIndex: 'logo',
            key: 'logo',
            align: 'center',
            width: 74,
            render: (logo: { thumbnail: string }, record) => (
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    src={logo.thumbnail ?? siteSettings.product.placeholder}
                    alt={record.name!}
                    width={42}
                    height={42}
                    className="overflow-hidden rounded"
                />
            ),
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
            render: (name: string) => <span className="whitespace-nowrap">{name}</span>,
        },
        {
            title: t('table:table-item-owner-name'),
            dataIndex: 'owner',
            key: 'owner',
            align: 'center',
            render: (owner: { name: string }) => owner.name,
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-total-products')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'products_count'}
                    isActive={sortingObj.column === 'products_count'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'products_count',
            key: 'products_count',
            align: 'center',
            onHeaderCell: () => onHeaderClick('products_count'),
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-total-orders')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'orders_count'}
                    isActive={sortingObj.column === 'orders_count'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'orders_count',
            key: 'orders_count',
            align: 'center',
            onHeaderCell: () => onHeaderClick('orders_count'),
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-status')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'is_active'}
                    isActive={sortingObj.column === 'is_active'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'is_active',
            key: 'is_active',
            align: 'center',
            onHeaderCell: () => onHeaderClick('is_active'),
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
            align: 'right',
            render: (id: string, { slug, is_active }) => {
                return (
                    <ActionButtons
                        id={id}
                        approveButton={true}
                        detailsUrl={`/${slug ?? ''}`}
                        isShopActive={is_active ?? true}
                    />
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

            {!!paginatorInfo?.total && (
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

export default ShopList
