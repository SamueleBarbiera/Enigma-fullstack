import Pagination from '@components/ui/pagination'
import { Table } from '@components/ui/table'
import ActionButtons from '@components/common/action-buttons'
import { getIcon } from '@utils/get-icon'
import * as tagIcon from '@components/icons/tag'
import { ROUTES } from '@utils/routes'
import { useTranslation } from 'next-i18next'
import { SortOrder, Tag, TagPaginator } from '@ts-types/generated'
import { useState } from 'react'
import TitleWithSort from '@components/ui/title-with-sort'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

export interface IProps {
    tags: TagPaginator
    onPagination: (key: number) => void
    onSort: (current: any) => void
    onOrder: (current: string) => void
}

const TagList = ({ tags, onPagination, onSort, onOrder }: IProps) => {
    const { t } = useTranslation()
    const { data, paginatorInfo } = tags

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

    const columns: readonly (ColumnGroupType<Tag> | ColumnType<Tag>)[] = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 60,
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
        },

        {
            title: t('table:table-item-icon'),
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            render: (icon: string) => {
                if (!icon) return null
                return (
                    <span className="flex items-center justify-center">
                        {getIcon({
                            iconList: tagIcon,
                            iconName: icon,
                            className: 'w-5 h-5 max-h-full max-w-full',
                        })}
                    </span>
                )
            },
        },
        {
            title: t('table:table-item-slug'),
            dataIndex: 'slug',
            key: 'slug',
            align: 'center',
            ellipsis: true,
        },
        {
            title: t('table:table-item-actions'),
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            width: 90,
            render: (id: string) => (
                <ActionButtons id={id} editUrl={`${ROUTES.TAGS}/${id}/edit`} deleteModalView="DELETE_TAG" />
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
                    scroll={{ x: 1000 }}
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

export default TagList
