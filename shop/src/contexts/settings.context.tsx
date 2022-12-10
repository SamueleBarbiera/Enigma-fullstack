import React from 'react'
import { siteSettings } from '@settings/site.settings'
import { SettingsOptions, SettingsType } from '@framework/types'

export interface InitialValue {
    seo: Seo
    logo: Logo
    currency: string
    taxClass: number
    siteTitle: string
    signupPoints: any
    siteSubtitle: string
    shippingClass: number
    contactDetails: ContactDetails
    minimumOrderAmount: number
    deliveryTime: any
    currencyToWalletRatio: any
}

export interface Seo {
    ogImage: any
    ogTitle: any
    metaTags: any
    metaTitle: any
    canonicalUrl: any
    ogDescription: any
    twitterHandle: any
    metaDescription: any
    twitterCardType: any
}

export interface Logo {
    id: number
    original: string
    thumbnail: string
}

export interface ContactDetails {
    email: string
    contact: string
    socials: Social[]
    website: string
    location: any
}

export interface Social {
    icon: string
    url: string
    label: string
}

const initialState: InitialValue = {
    currencyToWalletRatio: '',
    minimumOrderAmount: 1,
    signupPoints: '',
    taxClass: 1,
    shippingClass: 1,
    contactDetails: {
        email: '',
        contact: '',
        socials: [
            {
                url: '',
                label: '',
                icon: '',
            },
        ],
        website: '',
        location: '',
    },
    siteTitle: siteSettings.name,
    siteSubtitle: siteSettings.description,
    currency: siteSettings.currency,
    logo: {
        id: 1,
        thumbnail: siteSettings.logo.url,
        original: siteSettings.logo.url,
    },
    seo: {
        metaTitle: '',
        metaDescription: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: {
            thumbnail: '',
            original: '',
        },
        twitterHandle: '',
        twitterCardType: '',
        metaTags: '',
        canonicalUrl: '',
    },
}

export const SettingsContext = React.createContext<InitialValue>(initialState)

SettingsContext.displayName = 'SettingsContext'

export const SettingsProvider: React.FC<{ initialValue: InitialValue | undefined }> = ({ initialValue, ...props }) => {
    console.log('🚀 - file: settings.context.tsx - line 49 - initialValue', initialValue)
    const [state] = React.useState(initialValue ?? initialState)
    return <SettingsContext.Provider value={state} {...props} />
}

export const useSettings = () => {
    const context = React.useContext(SettingsContext)
    if (context === undefined) {
        throw new Error(`useSettings must be used within a SettingsProvider`)
    }
    return context
}
