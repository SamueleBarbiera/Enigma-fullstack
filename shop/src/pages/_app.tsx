import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { ManagedUIContext } from '@contexts/ui.context'
import ManagedModal from '@components/common/modal/managed-modal'
import ManagedDrawer from '@components/common/drawer/managed-drawer'
import React, { ComponentType, ReactElement, ReactNode, useEffect, useState } from 'react'
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
import { MyApp } from '@framework/types/main.app'
import { SessionProvider } from 'next-auth/react'

function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0 })
    }
}

export interface Props {
    children: React.ReactNode
}

const Noop = ({ children }: Props) => {
    return <>{children}</>
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

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
    authenticate?: boolean
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    pageProps: MyApp
}

const queryCache = new QueryCache()
const mutationCache = new MutationCache()

const Hydrated = ({ children }: any) => {
    const [hydration, setHydration] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHydration(true)
        }
    }, [])
    return hydration ? children : null
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const [queryClient] = useState(() => new QueryClient({ queryCache, mutationCache }))
    //const Layout = Component.Layout ?? Noop
    const authProps: boolean | undefined = Component.authenticate

    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <Hydrated>
            <SessionProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <AppSettings>
                            <ManagedUIContext>
                                <DefaultSeo />
                                {authProps ? (
                                    <PrivateRoute>{getLayout(<Component {...pageProps} />)}</PrivateRoute>
                                ) : (
                                    getLayout(<Component {...pageProps} />)
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
            </SessionProvider>
        </Hydrated>
    )
}

export default appWithTranslation(MyApp)
