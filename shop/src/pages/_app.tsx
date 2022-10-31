import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { ManagedUIContext } from '@contexts/ui.context'
import ManagedModal from '@components/common/modal/managed-modal'
import ManagedDrawer from '@components/common/drawer/managed-drawer'
import React, { ComponentType, useEffect, useState } from 'react'
import { DehydratedState, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation, UserConfig } from 'next-i18next'
import DefaultSeo from '@components/common/default-seo'

// Load Open Sans and satisfy typeface font
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/satisfy'
// external
import 'react-toastify/dist/ReactToastify.css'
// base css file
import '@styles/scrollbar.css'
import '@styles/swiper-carousel.css'
import '@styles/custom-plugins.css'
import '@styles/tailwind.css'
import { getDirection } from '@utils/get-direction'
import PageLoader from '@components/ui/page-loader/page-loader'
import ErrorMessage from '@components/ui/error-message'
import { SettingsProvider } from '@contexts/settings.context'
import { useSettingsQuery } from '@framework/settings/settings.query'
import type { NextPage } from 'next'
import PrivateRoute from '@lib/private-route'
import SocialLoginProvider from '../providers/social-login-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 })
    }
}

export interface Root {
    _nextI18Next: SSRConfigi18n
    children: React.ReactElement
}

const Noop = (children: Root) => {
    console.log('🚀 - file: _app.tsx - line 25 - Noop - children', children)
    return <>{children.children}</>
}

interface IProps {
    children?: React.ReactNode
}

const AppSettings = (props: IProps) => {
    const { data, isLoading: loading, error } = useSettingsQuery()
    return loading ? (
        <PageLoader />
    ) : error && error instanceof Error ? (
        <ErrorMessage message={error.message} />
    ) : (
        <SettingsProvider initialValue={data?.settings} {...props} />
    )
}

interface SSRConfigi18n {
    initialI18nStore: unknown
    initialLocale: string
    ns: string[]
    userConfig: UserConfig | null
}

interface INextProps {
    _nextI18Next: SSRConfigi18n
    dehydratedState: DehydratedState
}

type NextPageWithLayout<T> = NextPage<T> &
    ComponentType & {
        Layout?: React.ElementType
        authenticate?: boolean
    }

type AppPropsWithLayout<T> = AppProps<T> & {
    Component: NextPageWithLayout<T>
    pageProps: T
}

const queryCache = new QueryCache()
const mutationCache = new MutationCache()

const MyApp = ({ Component, pageProps }: AppPropsWithLayout<INextProps>) => {
    const [queryClient] = useState(() => new QueryClient({ queryCache, mutationCache }))
    const Layout = Component.Layout ?? Noop
    const authProps: boolean | undefined = Component.authenticate
    return (
        <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AppSettings>
                        <ManagedUIContext>
                            <DefaultSeo />
                            {authProps ? (
                                <PrivateRoute>
                                    <Layout {...pageProps}>
                                        <Component {...pageProps} />
                                    </Layout>
                                </PrivateRoute>
                            ) : (
                                <Layout {...pageProps}>
                                    <Component {...pageProps} />
                                </Layout>
                            )}
                            <ToastContainer autoClose={2000} />
                            <SocialLoginProvider />
                            <ManagedModal />
                            <ManagedDrawer />
                        </ManagedUIContext>
                    </AppSettings>
                </Hydrate>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AnimatePresence>
    )
}

export default appWithTranslation(MyApp)
