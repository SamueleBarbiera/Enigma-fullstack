import Image from 'next/image'

import { useTranslation } from 'next-i18next'
import Link from '@components/ui/link'
import Badge from '@components/ui/badge/badge'
import { Shop } from '@ts-types/generated'

interface ShopCardProps {
    shop: Shop
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }: ShopCardProps) => {
    const { t } = useTranslation()

    return (
        <Link href={`/${shop.slug!}`}>
            <div className="relative flex cursor-pointer items-center rounded border border-gray-200 bg-light p-5">
                <span className="absolute top-2 rounded bg-blue-500 px-2 py-1 text-xs text-light end-2">
                    {t('common:text-new')}
                </span>

                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-300">
                    <Image
                        alt={t('common:text-logo')}
                        src={shop.logo?.thumbnail ?? '/product-placeholder-borderless.svg'}
                        width={100}
                        height={100}
                    />
                </div>

                <div className="flex flex-col ms-4">
                    <span className="mb-2 text-lg font-semibold text-heading">{shop.name}</span>
                    <span>
                        <Badge
                            textKey={shop.is_active ? 'common:text-active' : 'common:text-inactive'}
                            color={shop.is_active ? 'bg-accent' : 'bg-red-500'}
                        />
                    </span>
                </div>
            </div>
        </Link>
    )
}

ShopCard.displayName = 'ShopCard'

export default ShopCard
