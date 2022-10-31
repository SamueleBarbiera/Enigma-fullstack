import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { getDirection } from '@utils/get-direction'
import { i18n } from 'next-i18next'

export default class CustomDocument extends Document {
    public static getInitialProps(ctx: DocumentContext) {
        return Document.getInitialProps(ctx)
    }
    public render() {
        const { locale } = this.props.__NEXT_DATA__
        const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'
        if (process.env.NODE_ENV !== 'production') {
            void i18n?.reloadResources(locale)
        }

        return (
            <Html>
                <Head />
                <body dir={dir}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
