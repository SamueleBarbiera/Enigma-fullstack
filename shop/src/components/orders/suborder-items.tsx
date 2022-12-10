import { useIsRTL } from '@lib/locals'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import Badge from '@components/ui/badge'
import { formatString } from '@lib/format-string'
import usePrice from '@lib/use-price'
import Link from '@components/ui/link'
import { ROUTES } from '@lib/routes'
import { Table } from '@components/ui/table'
import { ColumnGroupType, DefaultRecordType, ColumnType } from 'rc-table/lib/interface'

interface SuborderItemsProps {
    items: any
}

const SuborderItems: React.FC<SuborderItemsProps> = ({ items }) => {
    const { t } = useTranslation('common')

    const orderTableColumns: readonly (ColumnGroupType<DefaultRecordType> | ColumnType<DefaultRecordType>)[] = [
        {
            title: t('text-tracking-number'),
            dataIndex: 'tracking_number',
            key: 'tracking_number',
            align: 'left',
        },
        {
            title: t('text-date'),
            dataIndex: 'date',
            key: 'date',
            align: 'left',
            render: (created_at: string) => dayjs(created_at).format('MMMM D, YYYY'),
        },
        {
            title: t('text-status'),
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            render: function renderStatus(status: any) {
                return <Badge text={status?.name} className="font-semibold text-white" />
            },
        },
        {
            title: t('text-item'),
            dataIndex: 'products',
            key: 'products',
            align: 'left',
            render: (products: any) => formatString(products?.length, t('text-item')),
        },
        {
            title: t('text-total-price'),
            dataIndex: 'paid_total',
            key: 'paid_total',
            align: 'left',
            // width: 100,
            render: function TotalPrice(paid_total: any) {
                const { price } = usePrice({ amount: paid_total })
                return <p>{price}</p>
            },
        },
        {
            title: '',
            dataIndex: 'tracking_number',
            key: 'tracking_number',
            align: 'center',
            // width: 100,
            render: function renderTrackingNumber(tracking_number: string) {
                return (
                    <Link
                        href={`${ROUTES.ORDERS}/${tracking_number}`}
                        className="inline-flex items-center justify-center flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow text-heading underline hover:no-underline"
                    >
                        <div>{t('text-view')}</div>
                    </Link>
                )
            },
        },
    ]
    return (
        <Table
            columns={orderTableColumns}
            emptyText={t('table:empty-table-data')}
            data={items}
            rowKey="id"
            scroll={{ x: 800 }}
            className="subOrderTable w-full"
        />
    )
}

export default SuborderItems
