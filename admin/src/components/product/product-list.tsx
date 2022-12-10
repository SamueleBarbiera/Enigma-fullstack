import Pagination from '@components/ui/pagination'
import Image from 'next/image'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { siteSettings } from '@settings/site.settings'
import Badge from '@components/ui/badge/badge'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Product, ProductPaginator, Shop, SortOrder } from '@ts-types/generated'
import { Dispatch, SetStateAction, useState } from 'react'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

export interface IProps {
    products?: ProductPaginator | undefined
    onPagination: (current: number) => void
    onSort: Dispatch<SetStateAction<SortOrder>>
    onOrder: (current: string) => void
}

interface SortingObjType {
    sort: SortOrder
    column: string | null
}

const ProductList = ({ products, onPagination, onSort, onOrder }: IProps) => {
    const { data, paginatorInfo } = products ?? {}
    console.log('🚀 - file: product-list.tsx:27 - ProductList - products', products)
    const router = useRouter()
    const { t } = useTranslation()

    const [sortingObj, setSortingObj] = useState<SortingObjType>({
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

    let columns: (ColumnGroupType<Product> | ColumnType<Product>)[] = [
        {
            title: t('table:table-item-image'),
            dataIndex: 'image',
            key: 'image',
            align: 'left',
            width: 74,
            render: (record: Product) => (
                <Image
                    src={record.image?.thumbnail ?? siteSettings.product.placeholder}
                    alt={''}
                    width={42}
                    height={42}
                    className="overflow-hidden rounded object-cover"
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
            width: 200,
            ellipsis: true,
            onHeaderCell: () => onHeaderClick('name'),
        },
        {
            title: t('table:table-item-group'),
            dataIndex: 'type',
            key: 'type',
            width: 120,
            align: 'center',
            ellipsis: true,
        },
        {
            title: t('table:table-item-shop'),
            dataIndex: 'shop',
            key: 'shop',
            width: 120,
            align: 'center',
            ellipsis: true,
            render: (shop: Shop) => <span className="truncate whitespace-nowrap">{shop.name}</span>,
        },
        {
            title: 'Product Type',
            dataIndex: 'product_type',
            key: 'product_type',
            width: 120,
            align: 'center',
            render: (product_type: string) => <span className="truncate whitespace-nowrap">{product_type}</span>,
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-unit')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'price'}
                    isActive={sortingObj.column === 'price'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            width: 100,
            onHeaderCell: () => onHeaderClick('price'),
        },
        {
            title: (
                <TitleWithSort
                    title={t('table:table-item-quantity')}
                    ascending={sortingObj.sort === SortOrder.Asc && sortingObj.column === 'quantity'}
                    isActive={sortingObj.column === 'quantity'}
                />
            ),
            className: 'cursor-pointer',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 100,
            onHeaderCell: () => onHeaderClick('quantity'),
        },
        {
            title: t('table:table-item-status'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 100,
            render: (status: string) => (
                <Badge text={status} color={status.toLocaleLowerCase() === 'draft' ? 'bg-yellow-400' : 'bg-accent'} />
            ),
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'slug',
            key: 'actions',
            align: 'center',
            width: 80,
            render: (slug: string, record: Product) => (
                <ActionButtons
                    id={record.id}
                    editUrl={`${router.asPath}/${slug}/edit`}
                    deleteModalView="DELETE_PRODUCT"
                />
            ),
        },
    ]

    if (router.query.shop) {
        columns = columns.filter((column) => column.key !== 'shop')
    }

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    columns={columns}
                    emptyText={t('table:empty-table-data')}
                    data={data}
                    rowKey="id"
                    scroll={{ x: 900 }}
                />
            </div>

            {!!products?.paginatorInfo.total && (
                <div className="flex items-center justify-end">
                    <Pagination
                        total={paginatorInfo?.total}
                        current={paginatorInfo?.currentPage}
                        pageSize={paginatorInfo?.perPage}
                        onChange={onPagination}
                        showLessItems
                    />
                </div>
            )}
        </>
    )
}

export default ProductList
