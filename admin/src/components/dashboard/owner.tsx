/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import ErrorMessage from '@components/ui/error-message'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useMeQuery } from '@data/user/use-me.query'
import ShopCard from '@components/shop/shop-card'
import NoShopSvg from '../../../public/no-shop.svg'
import { Shop } from '@ts-types/generated'

export default function OwnerDashboard() {
    const { t } = useTranslation()
    const { data, isLoading: loading, error } = useMeQuery()

    if (loading) return <Loader text={t('common:text-loading')} />
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'any error'
        if (error instanceof Error) console.log(`❌ Error message: ${errorMessage}`)
        return <ErrorMessage message={errorMessage} />
    }
    return (
        <>
            <div className="mb-5 border-b border-dashed border-border-base pb-8 sm:mb-8">
                <h1 className="text-lg font-semibold text-heading">{t('common:sidebar-nav-item-my-shops')}</h1>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-5">
                {data?.shops.map((myShop: Shop, idx: number) => (
                    <ShopCard shop={myShop} key={idx} />
                ))}
            </div>

            {!data?.managed_shop && !data?.shops.length ? (
                <div className="flex w-full flex-col items-center p-10">
                    <div className="relative h-[180px] w-[300px] sm:h-[370px] sm:w-[490px]">
                        <Image width={40} height={40} alt={t('common:text-image')} src={NoShopSvg as string} />
                    </div>
                    <span className="mt-6 text-center text-lg font-semibold text-body-dark sm:mt-10">
                        {t('common:text-no-shop')}
                    </span>
                </div>
            ) : null}
            {data?.managed_shop ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
                    <ShopCard shop={data.managed_shop} />
                </div>
            ) : null}
        </>
    )
}
