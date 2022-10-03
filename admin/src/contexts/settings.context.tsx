import React, { createContext, useContext, useMemo, useState } from 'react'
export interface State {
    settings: any
}

const initialState = {
    siteTitle: 'Enigma',
    siteSubtitle: '',
    currency: 'USD',
    logo: {
        id: 1,
        thumbnail: '/logo.svg',
        original: '/logo.svg',
    },
}

export const SettingsContext = createContext<State | any>(initialState)

SettingsContext.displayName = 'SettingsContext'

export const SettingsProvider: React.FC<{ initialValue: any; props: any }> = ({ initialValue, ...props }) => {
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
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error(`useSettings must be used within a SettingsProvider`)
    }
    return context
}
