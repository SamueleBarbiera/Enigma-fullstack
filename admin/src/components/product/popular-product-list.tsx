/* eslint-disable react-hooks/rules-of-hooks */
import { Table } from '@components/ui/table'
import { CreateProduct, Product, ProductType, Shop } from '@ts-types/generated'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'
import usePrice from '@utils/use-price'

export interface IProps {
    products?: CreateProduct | undefined
    title?: string
}

const PopularProductList = ({ products, title }: IProps) => {
    console.log('🚀 - file: popular-product-list.tsx - line 15 - PopularProductList - products', products)
    const router = useRouter()
    const { t } = useTranslation()

    let columns: readonly (ColumnGroupType<Product> | ColumnType<Product>)[] = [
        {
            title: t('table:table-item-id'),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 64,
        },
        {
            title: t('table:table-item-title'),
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: 200,
            render: (name: string) => <span className="whitespace-nowrap">{name}</span>,
        },
        {
            title: t('table:table-item-group'),
            dataIndex: 'product_type',
            key: 'product_type',
            align: 'center',
            render: (product_type: any) => <span className="whitespace-nowrap">{product_type}</span>,
        },

        {
            title: t('table:table-item-shop'),
            dataIndex: 'shop',
            key: 'shop',
            // width: 120,
            align: 'center',
            ellipsis: true,
            render: (shop: Shop) => <span className="truncate whitespace-nowrap">{shop?.name}</span>,
        },

        {
            title: t('table:table-item-unit'),
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            width: 160,
            render: (value: number, record: Product) => {
                if (record?.product_type === ProductType.Variable) {
                    return (
                        <span
                            className="whitespace-nowrap"
                            title={`${record?.min_price} - ${record?.max_price}`}
                        >{`${record?.min_price} - ${record?.max_price}`}</span>
                    )
                } else {
                    return <span className="whitespace-nowrap">{value}</span>
                }
            },
        },
        {
            title: t('table:table-item-quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 80,
        },
    ]

    if (router?.query?.shop) {
        columns = columns?.filter((column) => column?.key !== 'shop')
    }

    return (
        <div className="mb-6 overflow-hidden rounded shadow">
            <h3 className="border-b border-border-200 bg-light px-4 py-3 text-center font-semibold text-heading">
                {title}
            </h3>
            <Table
                columns={columns}
                emptyText={t('table:empty-table-data')}
                data={products}
                rowKey="id"
                scroll={{ x: 700 }}
            />
        </div>
    )
}

export default PopularProductList
