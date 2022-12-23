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
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Hydrate } from '@tanstack/react-query'
import { ComponentType, useState } from 'react'
import { useSettingsQuery } from '@data/settings/use-settings.query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { appWithTranslation, UserConfig } from 'next-i18next'
import { ModalProvider } from '@components/ui/modal/modal.context'
import DefaultSeo from '@components/ui/default-seo'
import PrivateRoute from '@utils/private-route'
import ManagedModal from '@components/ui/modal/managed-modal'
import { NextPage } from 'next'

export interface Root {
    _nextI18Next: SSRConfigi18n
    children: React.ReactElement
}

const Noop = (children: Root) => {
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
        <SettingsProvider initialValue={data} {...props} />
    )
}

interface SSRConfigi18n {
    initialI18nStore: any
    initialLocale: string
    ns: string[]
    userConfig: UserConfig | null
}

// interface INextProps {
//     _nextI18Next: SSRConfigi18n
//     dehydratedState: DehydratedState
// }

type NextPageWithLayout = NextPage &
    ComponentType & {
        Layout?: React.ElementType
        authenticate?: boolean
    }

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
    pageProps: any
}

const queryCache = new QueryCache()
const mutationCache = new MutationCache()

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const [queryClient] = useState(() => new QueryClient({ queryCache, mutationCache }))
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
