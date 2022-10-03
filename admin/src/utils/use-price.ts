/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { siteSettings } from '@settings/site.settings'
import { useSettings } from '@contexts/settings.context'
export function formatPrice(amount: number, currencyCode: string, locale: string) {
    const formatCurrency = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    })

    return formatCurrency.format(amount)
}

export function formatVariantPrice(amount: number, baseAmount: number, currencyCode: string, locale: string) {
    const hasDiscount = baseAmount < amount
    const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' })
    const discount = hasDiscount ? formatDiscount.format((amount - baseAmount) / amount) : null

    const price = formatPrice(amount, currencyCode, locale)
    const basePrice = hasDiscount ? formatPrice(baseAmount, currencyCode, locale) : null

    return { price, basePrice, discount }
}
interface PriceProps {
    amount: number
    baseAmount?: number
    currencyCode?: string
}

export default function usePrice(data?: PriceProps | null) {
    const { currency } = useSettings()
    const { amount, baseAmount, currencyCode = currency } = data ?? {}
    const locale = siteSettings.defaultLanguage
    let value: any
    if (typeof amount !== 'number' || !currencyCode) return (value = '')

    if (baseAmount) {
        value = formatVariantPrice(amount, baseAmount, currencyCode, locale)
    }
    value = formatPrice(amount, currencyCode, locale)

    return typeof value === 'string' ? { price: value, basePrice: null, discount: null } : value
}
