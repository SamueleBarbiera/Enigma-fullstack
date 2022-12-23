/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SeoSettings, SettingsInput, SettingsOptions } from '@ts-types/generated'
import React, { createContext, useContext, useMemo, useState } from 'react'

const initialState: SettingsOptions = {
    logo: {
        id: '1',
        original: '',
        thumbnail: '',
    },
    currency: 'EUR',
    taxClass: '1',
    siteTitle: 'Enigma',

    siteSubtitle: 'Ecommerce',
    shippingClass: '1',

    minimumOrderAmount: 1,
    signupPoints: 0,
}

export const SettingsContext = createContext<SettingsOptions | any>(initialState)

SettingsContext.displayName = 'SettingsContext'

export type SettingProvider = { initialValue?: any | undefined; props?: any }

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
    const SettingsOptions = useContext(SettingsContext)
    return SettingsOptions
}
