/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SettingsInput } from '@ts-types/generated'
import React, { createContext, useContext, useMemo, useState } from 'react'

export interface Context {
    seo?: Seo
    logo: Logo
    currency: string
    taxClass: number
    siteTitle: string
    deliveryTime?: DeliveryTime[]
    signupPoints: unknown
    siteSubtitle: string
    shippingClass: number
    contactDetails?: ContactDetails
    minimumOrderAmount: number
    currencyToWalletRatio?: unknown
}

export interface Seo {
    ogImage: unknown[]
    ogTitle: unknown
    metaTags: unknown
    metaTitle: unknown
    canonicalUrl: unknown
    ogDescription: unknown
    twitterHandle: unknown
    metaDescription: unknown
    twitterCardType: unknown
}

export interface Logo {
    id: number
    original: string
    thumbnail: string
}

export interface DeliveryTime {
    title: string
    description: string
}

export interface ContactDetails {
    email: string
    contact: string
    socials: Social[]
    website: string
    location: unknown[]
}

export interface Social {
    url: string
    icon: string
    label: string
}

const initialState: SettingsInput = {
    options: {
        logo: {
            id: '1',
            original: 'http://localhost:8000/storage/326/1024.png',
            thumbnail: 'http://localhost:8000/storage/326/conversions/1024-thumbnail.jpg',
        },
        currency: 'EUR',
        taxClass: '1',
        siteTitle: 'Enigma',

        siteSubtitle: 'Your next ecommerce',
        shippingClass: '1',

        minimumOrderAmount: 1,
    },
}

export const SettingsContext = createContext<Context | SettingsInput>(initialState)

SettingsContext.displayName = 'SettingsContext'

export type SettingProvider = { initialValue?: SettingsInput | undefined; props?: unknown }

export const SettingsProvider = ({ initialValue, ...props }: SettingProvider) => {
    const [state, updateSettings] = useState(initialValue ?? initialState)
    const value = useMemo(
        () => ({
            ...state,
            updateSettings,
        }),
        [state]
    )
    return <SettingsContext.Provider value={value} {...props} />
}

export const useSettings = () => {
    const context: Context | SettingsInput = useContext(SettingsContext)
    return context
}
