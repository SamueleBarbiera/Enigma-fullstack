import { useState } from 'react'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { Attribute, AttributeInput, AttributeValue, Shop, SortOrder } from '@ts-types/generated'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

export type IProps = {
    attributes: AttributeInput | undefined
    onSort: (current: any) => void
    onOrder: (current: string) => void
}
const AttributeList = ({ attributes, onSort, onOrder }: IProps) => {
    const { t } = useTranslation()
    const router = useRouter()

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

    let columns: readonly (ColumnGroupType<Attribute> | ColumnType<Attribute>)[] = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 60,
        },
        {
            // title: t("table:table-item-title"),
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
            render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
        },
        {
            title: t('table:table-item-shop'),
            dataIndex: 'shop',
            key: 'shop',
            width: 120,
            align: 'center',
            ellipsis: true,
            render: (shop: Shop) => <span className="block truncate">{shop.name}</span>,
        },
        {
            title: t('table:table-item-values'),
            dataIndex: 'values',
            key: 'values',
            align: 'left',
            render: (values: AttributeValue[]) => {
                return (
                    <span className="block truncate">
                        {values.map((singleValues, index: number) => {
                            return index > 0 ? `, ${singleValues.value!}` : `${singleValues.value!}`
                        })}
                    </span>
                )
            },
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'right',
            render: (id: string) => (
                <ActionButtons id={id} editUrl={`${router.asPath}/${id}/edit`} deleteModalView="DELETE_ATTRIBUTE" />
            ),
        },
    ]

    if (router.query.shop) {
        columns = columns.filter((column) => column.key !== 'shop')
    }

    return (
        <div className="mb-8 overflow-hidden rounded shadow">
            <Table
                columns={columns}
                emptyText={t('table:empty-table-data')}
                data={attributes as Attribute[] | undefined}
                rowKey="id"
                scroll={{ x: 380 }}
            />
        </div>
    )
}

export default AttributeList
