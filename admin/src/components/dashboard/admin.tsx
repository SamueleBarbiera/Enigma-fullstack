import { CartIconBig } from '@components/icons/cart-icon-bag'
import { CoinIcon } from '@components/icons/coin-icon'
import ColumnChart from '@components/widgets/column-chart'
import StickerCard from '@components/widgets/sticker-card'
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import RecentOrders from '@components/order/recent-orders'
import PopularProductList from '@components/product/popular-product-list'
import { useOrdersQuery } from '@data/order/use-orders.query'
import { usePopularProductsQuery } from '@data/analytics/use-popular-products.query'
import { useAnalyticsQuery } from '@data/analytics/use-analytics.query'
import { useTranslation } from 'next-i18next'
import { ShopIcon } from '@components/icons/sidebar'
import { DollarIcon } from '@components/icons/shops/dollar'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function Dashboard() {
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useAnalyticsQuery()

    useEffect(() => {
        if (error) {
            error instanceof Error ? toast.error(`Something went wrong: ${error.message}`) : null
        }
    }, [error])

    const {
        data: orderData,
        isLoading: orderLoading,
        error: orderError,
    } = useOrdersQuery({
        limit: 10,
        page: 1,
    })
    
    const {
        data: popularProductData,
        isLoading: popularProductLoading,
        error: popularProductError,
    } = usePopularProductsQuery({ limit: 10 })

    let salesByYear: number[] = Array.from({ length: 12 }, (_) => 0)
    if (!!data?.totalYearSaleByMonth?.length) {
        salesByYear = data.totalYearSaleByMonth.map((item: any) => item.total.toFixed(2))
    }
    return (
        <>
            {loading || orderLoading || popularProductLoading ? (
                <Loader text={t('common:text-loading')} />
            ) : orderError instanceof Error && popularProductError instanceof Error ? (
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                <ErrorMessage message={orderError.message && popularProductError.message} />
            ) : (
                <>
                    <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="w-full ">
                            <StickerCard
                                titleTransKey="sticker-card-title-rev"
                                subtitleTransKey="sticker-card-subtitle-rev"
                                icon={<DollarIcon className="h-7 w-7" color="#047857" />}
                                iconBgStyle={{ backgroundColor: '#A7F3D0' }}
                                price={data?.totalRevenue}
                                indicator={''}
                                indicatorText={undefined}
                                note={undefined}
                                link={undefined}
                                linkText={undefined}
                            />
                        </div>
                        <div className="w-full ">
                            <StickerCard
                                titleTransKey="sticker-card-title-order"
                                subtitleTransKey="sticker-card-subtitle-order"
                                icon={<CartIconBig />}
                                price={data?.totalOrders}
                                iconBgStyle={undefined}
                                indicator={''}
                                indicatorText={undefined}
                                note={undefined}
                                link={undefined}
                                linkText={undefined}
                            />
                        </div>
                        <div className="w-full ">
                            <StickerCard
                                titleTransKey="sticker-card-title-today-rev"
                                icon={<CoinIcon />}
                                price={data?.todaysRevenue}
                                subtitleTransKey={''}
                                iconBgStyle={undefined}
                                indicator={''}
                                indicatorText={undefined}
                                note={undefined}
                                link={undefined}
                                linkText={undefined}
                            />
                        </div>
                        <div className="w-full ">
                            <StickerCard
                                titleTransKey="sticker-card-title-total-shops"
                                icon={<ShopIcon className="w-6" color="#1D4ED8" />}
                                iconBgStyle={{ backgroundColor: '#93C5FD' }}
                                price={data?.totalShops}
                                subtitleTransKey={''}
                                indicator={''}
                                indicatorText={undefined}
                                note={undefined}
                                link={undefined}
                                linkText={undefined}
                            />
                        </div>
                    </div>

                    <div className="mb-6 flex w-full flex-wrap">
                        <ColumnChart
                            widgetTitle="Sale History"
                            colors={['#03D3B5']}
                            series={salesByYear}
                            categories={[
                                t('common:january'),
                                t('common:february'),
                                t('common:march'),
                                t('common:april'),
                                t('common:may'),
                                t('common:june'),
                                t('common:july'),
                                t('common:august'),
                                t('common:september'),
                                t('common:october'),
                                t('common:november'),
                                t('common:december'),
                            ]}
                        />
                    </div>

                    <div className="mb-6 flex w-full flex-wrap">
                        <div className="mb-6 w-full sm:px-3 sm:pl-0 xl:mb-0 ">
                            <RecentOrders orders={orderData?.orders.data} title={t('table:recent-order-table-title')} />
                        </div>
                    </div>
                    <div className="mb-6 w-full sm:pe-0 xl:mb-0">
                        <PopularProductList
                            products={popularProductData?.data}
                            title={t('table:popular-products-table-title')}
                        />
                    </div>
                </>
            )}
        </>
    )
}
