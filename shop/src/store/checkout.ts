import { Address, Coupon } from '@framework/types'
import { CHECKOUT } from '@lib/constants'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface DeliveryTime {
    id: string
    title: string
    description: string
}
interface VerifiedResponse {
    total_tax: number
    shipping_charge: number
    unavailable_products: any[]
}
interface CheckoutState {
    billing_address: Address | null
    shipping_address: Address | null
    payment_gateway: PaymentMethodName
    delivery_time: DeliveryTime | null
    customer_contact: string
    verified_response: VerifiedResponse | null
    coupon: Coupon | null
    [key: string]: unknown
}
export const defaultCheckout: CheckoutState = {
    billing_address: null,
    shipping_address: null,
    delivery_time: null,
    payment_gateway: 'STRIPE',
    customer_contact: '',
    verified_response: null,
    coupon: null,
}
export type PaymentMethodName = 'CASH_ON_DELIVERY' | 'STRIPE'

// Original atom.
export const checkoutAtom = atomWithStorage(CHECKOUT, defaultCheckout)
export const clearCheckoutAtom = atom(null, (_get: any, set: (arg0: any, arg1: CheckoutState) => any, _data: any) => {
    return set(checkoutAtom, defaultCheckout)
})
export const billingAddressAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; billing_address: any }) => get(checkoutAtom).billing_address,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: Address) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, billing_address: data })
    }
)
export const shippingAddressAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; shipping_address: any }) => get(checkoutAtom).shipping_address,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: Address) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, shipping_address: data })
    }
)
export const deliveryTimeAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; delivery_time: any }) => get(checkoutAtom).delivery_time,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: DeliveryTime) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, delivery_time: data })
    }
)
export const paymentGatewayAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; payment_gateway: any }) => get(checkoutAtom).payment_gateway,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: PaymentMethodName) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, payment_gateway: data })
    }
)
export const verifiedTokenAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; token: any }) => get(checkoutAtom).token,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: string) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, token: data })
    }
)
export const customerContactAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; customer_contact: any }) => get(checkoutAtom).customer_contact,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: string) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, customer_contact: data })
    }
)
export const verifiedResponseAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; verified_response: any }) => get(checkoutAtom).verified_response,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: VerifiedResponse | null) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, verified_response: data })
    }
)
export const couponAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; coupon: any }) => get(checkoutAtom).coupon,
    (get: (arg0: any) => any, set: (arg0: any, arg1: any) => any, data: Coupon | null) => {
        const prev = get(checkoutAtom)
        return set(checkoutAtom, { ...prev, coupon: data })
    }
)
export const discountAtom = atom(
    (get: (arg0: any) => { (): any; new (): any; coupon: { (): any; new (): any; amount: any } }) =>
        get(checkoutAtom).coupon?.amount
)
