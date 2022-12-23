/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import Card from '@components/common/card'
import Layout from '@components/layouts/admin'
import Image from 'next/image'
import { Table } from '@components/ui/table'
import ProgressBox from '@components/ui/progress-box/progress-box'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Button from '@components/ui/button'
import ErrorMessage from '@components/ui/error-message'
import { siteSettings } from '@settings/site.settings'
import { formatAddress } from '@utils/format-address'
import Loader from '@components/ui/loader/loader'
import ValidationError from '@components/ui/form-validation-error'
import { Attachment, OrderStatus, Product } from '@ts-types/generated'
import { useOrderQuery } from '@data/order/use-order.query'
import { useUpdateOrderMutation } from '@data/order/use-order-update.mutation'
import { useOrderStatusesQuery } from '@data/order-status/use-order-statuses.query'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SelectInput from '@components/ui/select-input'

import { GetServerSideProps } from 'next'
import { ColumnGroupType, ColumnType } from 'rc-table/lib/interface'

interface FormValues {
    order_status: OrderStatus
}

export default function OrderDetailsPage() {
    const { t } = useTranslation()
    const { query } = useRouter()

    const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation()
    const { data: orderStatusData } = useOrderStatusesQuery({})
    const { data, isLoading: loading, error } = useOrderQuery(query.orderId as string)
    //console.log('🚀 - file: index.tsx - line 37 - OrderDetailsPage - data', data)

    const {
        handleSubmit,
        control,

        formState: { errors },
    } = useForm<FormValues>({
        //@ts-ignore
        defaultValues: { order_status: data?.status },
    })

    const ChangeStatus = ({ order_status }: FormValues) => {
        updateOrder({
            variables: {
                id: data?.id,
                input: {
                    status: order_status.id,
                },
            },
        })
    }

    const columns: readonly (ColumnGroupType<Product> | ColumnType<Product>)[] = [
        {
            dataIndex: 'image',
            key: 'image',
            width: 70,
            render: (image: Attachment) => (
                <Image
                    src={image.thumbnail ?? siteSettings.product.placeholder}
                    alt="alt text"
                    width={50}
                    height={50}
                />
            ),
        },
        {
            title: t('table:table-item-products'),
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            render: (name: string, item: Product) => (
                <div>
                    <span>{name}</span>
                    <span className="mx-2">x</span>
                    <span className="font-semibold text-heading">{item.pivot!.order_quantity}</span>
                </div>
            ),
        },
        {
            title: t('table:table-item-total'),
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            // render: (_: any, item: any) => {
            //     const price = usePrice({
            //         amount: parseFloat(item.pivot.subtotal),
            //     })
            //     return <span>{price}</span>
            // },
        },
    ]

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <Card>
            <div className="flex flex-col items-center lg:flex-row">
                <h3 className="mb-8 w-full whitespace-nowrap text-center text-2xl font-semibold text-heading lg:mb-0 lg:w-1/3 lg:text-start">
                    {t('form:input-label-order-id')} - {data.tracking_number}
                </h3>

                <form onSubmit={handleSubmit(ChangeStatus)} className="flex w-full items-start ms-auto lg:w-2/4">
                    <div className="z-20 w-full me-5">
                        <SelectInput
                            name="order_status"
                            control={control}
                            getOptionLabel={(option: { name: string }) => option.name}
                            getOptionValue={(option: { id: string }) => option.id}
                            options={orderStatusData?.order_statuses.data}
                            placeholder={t('form:input-placeholder-order-status')}
                            isMulti={undefined}
                            isClearable={undefined}
                            isLoading={false}
                        />

                        <ValidationError
                            message={t(
                                errors.order_status?.message as
                                    | string
                                    | TemplateStringsArray
                                    | (string | TemplateStringsArray)[]
                            )}
                        />
                    </div>
                    <Button loading={updating}>
                        <span className="hidden sm:block">{t('form:button-label-change-status')}</span>
                        <span className="block sm:hidden">{t('form:button-label-change')}</span>
                    </Button>
                </form>
            </div>

            <div className="my-5 flex items-center justify-center lg:my-10">
                <ProgressBox data={orderStatusData?.order_statuses.data} status={data.status.serial} />
            </div>

            <div className="mb-10">
                {data ? (
                    <Table
                        columns={columns}
                        emptyText={t('table:empty-table-data')}
                        data={data.products}
                        rowKey="id"
                        scroll={{ x: 300 }}
                    />
                ) : (
                    <span>{t('common:no-order-found')}</span>
                )}

                <div className="flex w-full flex-col space-y-2 border-t-4 border-double border-border-200 px-4 py-4 ms-auto sm:w-1/2 md:w-1/3">
                    <div className="flex items-center justify-between text-sm text-body">
                        <span>{t('common:order-sub-total')}</span>
                        <span>{data.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-body">
                        <span>{t('common:order-tax')}</span>
                        <span>{data.sales_tax}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-body">
                        <span>{t('common:order-delivery-fee')}</span>
                        <span>{data.delivery_fee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-body">
                        <span>{t('common:order-discount')}</span>
                        <span>{data.discount}</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-semibold text-heading">
                        <span>{t('common:order-total')}</span>
                        <span>{data.paid_total}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="mb-10 w-full sm:mb-0 sm:w-1/2 sm:pe-8">
                    <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading">
                        {t('common:billing-address')}
                    </h3>

                    <div className="flex flex-col items-start space-y-1 text-sm text-body">
                        <span>{data.status.name}</span>
                        {data.billing_address && <span>{formatAddress(data.billing_address)}</span>}
                        {data.customer_id && <span>{data.tracking_number}</span>}
                    </div>
                </div>

                <div className="w-full sm:w-1/2 sm:ps-8">
                    <h3 className="mb-3 border-b border-border-200 pb-2 font-semibold text-heading text-start sm:text-end">
                        {t('common:shipping-address')}
                    </h3>

                    <div className="flex flex-col items-start space-y-1 text-sm text-body text-start sm:items-end sm:text-end">
                        <span>{data.customer_id}</span>
                        {data.shipping_address && <span>{formatAddress(data.shipping_address)}</span>}
                        {data.customer_id && <span>{data.tracking_number}</span>}
                    </div>
                </div>
            </div>
        </Card>
    )
}
OrderDetailsPage.Layout = Layout

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['common', 'form', 'table'])),
    },
})
