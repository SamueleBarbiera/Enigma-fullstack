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
import { DehydratedState, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { ComponentType, useMemo } from 'react'
import { useSettingsQuery } from '@data/settings/use-settings.query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation, UserConfig } from 'next-i18next'
import { ModalProvider } from '@components/ui/modal/modal.context'
import DefaultSeo from '@components/ui/default-seo'
import PrivateRoute from '@utils/private-route'
import ManagedModal from '@components/ui/modal/managed-modal'
import { NextPage } from 'next'

const Noop = (children: React.ReactElement) => {
    return <>{children}</>
}

interface IProps {
    children: React.ReactElement
}

const AppSettings = (props: IProps) => {
    const { data, isLoading: loading, error } = useSettingsQuery()
    return loading ? (
        <PageLoader />
    ) : error ? (
        <ErrorMessage message={error} />
    ) : (
        <SettingsProvider initialValue={data?.options} {...props} />
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

const queryCache = new QueryCache()
const mutationCache = new MutationCache()

type NextPageWithLayout<T> = NextPage<T> &
    ComponentType & {
        Layout?: React.ElementType
        authenticate?: boolean
    }

type AppPropsWithLayout<T> = AppProps<T> & {
    Component: NextPageWithLayout<T>
    pageProps: T
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout<INextProps>) => {
    const queryClient = useMemo(() => new QueryClient({ queryCache, mutationCache }), [])
    const Layout = Component.Layout ?? Noop
    const authProps: boolean | undefined = Component.authenticate

    return (
        <QueryClientProvider client={queryClient}>
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

export default appWithTranslation(MyApp)
