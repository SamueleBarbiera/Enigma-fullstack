import dayjs from 'dayjs'
import { Table } from '@components/ui/table'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Order, OrderStatus } from '@ts-types/generated'
import { useTranslation } from 'next-i18next'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

interface IProps {
    orders: Order[] | undefined
    title?: string
}

const RecentOrders = ({ orders, title }: IProps) => {
    console.log('🚀 - file: recent-orders.tsx - line 16 - RecentOrders - orders', orders)
    const { t } = useTranslation()
    //const rowExpandable = (record: { children: string | unknown[] }) => record.children.length

    const columns: readonly (ColumnGroupType<Order> | ColumnType<Order>)[] = [
        {
            title: t('table:table-item-tracking-number'),
            dataIndex: 'tracking_number',
            key: 'tracking_number',
            align: 'center',
            width: 150,
        },
        {
            title: t('table:table-item-total'),
            dataIndex: 'total',
            key: 'total',
            align: 'center',
        },
        {
            title: t('table:table-item-order-date'),
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            render: (date: string) => {
                dayjs.extend(relativeTime)
                dayjs.extend(utc)
                dayjs.extend(timezone)
                return <span className="whitespace-nowrap">{dayjs.utc(date).tz(dayjs.tz.guess()).fromNow()}</span>
            },
        },
        {
            title: t('table:table-item-status'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status: OrderStatus) => (
                <span className="whitespace-nowrap font-semibold" style={{ color: status.color }}>
                    {status.name}
                </span>
            ),
        },
    ]

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <h3 className="border-b border-border-200 bg-light px-4 py-3 text-center font-semibold text-heading">
                    {title}
                </h3>
                <Table
                    columns={columns}
                    emptyText={t('table:empty-table-data')}
                    data={orders}
                    rowKey="id"
                    scroll={{ x: 200 }}
                />
            </div>
        </>
    )
}

export default RecentOrders
