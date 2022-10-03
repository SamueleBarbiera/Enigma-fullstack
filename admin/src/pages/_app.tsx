import type { AppProps } from 'next/app'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import 'react-toastify/dist/ReactToastify.css'
import '@assets/main.css'
import { UIProvider } from '@contexts/ui.context'
import { SettingsProvider } from '@contexts/settings.context'
import ErrorMessage from '@components/ui/error-message'
import PageLoader from '@components/ui/page-loader/page-loader'
import { ToastContainer } from 'react-toastify'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ElementType, useMemo } from 'react'
import { useSettingsQuery } from '@data/settings/use-settings.query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { appWithTranslation } from 'next-i18next'
import { ModalProvider } from '@components/ui/modal/modal.context'
import DefaultSeo from '@components/ui/default-seo'
import PrivateRoute from '@utils/private-route'
import ManagedModal from '@components/ui/modal/managed-modal'
import { NextPage } from 'next'

const Noop = ({ children }: any) => <>{children}</>

const AppSettings = (props: any) => {
    const { data, isLoading: loading, error } = useSettingsQuery()
    return loading ? (
        <PageLoader />
    ) : error ? (
        <ErrorMessage message={error} />
    ) : (
        <SettingsProvider initialValue={data?.options} {...props} />
    )
}

type NextPageWithLayout = NextPage & {
    Layout?: any
    authenticate?: boolean
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    pageProps: any
}

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const queryCache = new QueryCache()
    const mutationCache = new MutationCache()
    const queryClientRef = useMemo(() => new QueryClient({ queryCache, mutationCache }), [])
    const Layout: ElementType = Component.Layout || Noop
    const authProps: boolean | undefined = Component.authenticate

    return (
        <QueryClientProvider client={queryClientRef}>
            <Hydrate state={pageProps.dehydratedState}>
                <AppSettings>
                    <UIProvider>
                        <ModalProvider>
                            <>
                                <DefaultSeo />
                                {authProps ? (
                                    <PrivateRoute authProps={authProps}>
                                        <Layout {...pageProps}>
                                            <Component {...pageProps} />
                                        </Layout>
                                    </PrivateRoute>
                                ) : (
                                    <Layout {...pageProps}>
                                        <Component {...pageProps} />
                                    </Layout>
                                )}
                                <ToastContainer autoClose={2000} theme="colored" />
                                <ManagedModal />
                            </>
                        </ModalProvider>
                    </UIProvider>
                </AppSettings>
                <ReactQueryDevtools />
            </Hydrate>
        </QueryClientProvider>
    )
}

export default appWithTranslation(CustomApp)
