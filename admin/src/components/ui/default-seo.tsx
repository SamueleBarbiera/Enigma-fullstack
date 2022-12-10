/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useSettings } from '@contexts/settings.context'
import { DefaultSeo as NextDefaultSeo } from 'next-seo'

const DefaultSeo = () => {
    const settings = useSettings()
    return (
        <NextDefaultSeo
            title={settings.siteTitle ?? 'Enigma'}
            titleTemplate={`%s | ${settings.seo?.metaTitle}`}
            description={(settings.seo?.metaDescription as string) || settings.siteSubtitle!}
            canonical={settings.seo?.canonicalUrl as string}
            openGraph={{
                title: settings.seo?.ogTitle as string,
                description: settings.seo?.ogDescription as string,
                type: 'website',
                locale: 'it_IT',
                site_name: settings.siteTitle!,
                images: [
                    {
                        url: settings.seo?.ogImage as string,
                        width: 800,
                        height: 600,
                        alt: settings.seo?.ogTitle as string,
                    },
                ],
            }}
            twitter={{
                handle: settings.seo?.twitterHandle as string,
                site: settings.siteTitle!,
                cardType: settings.seo?.twitterCardType as string,
            }}
            additionalMetaTags={[
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1 maximum-scale=1',
                },
                {
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes',
                },
                {
                    name: 'theme-color',
                    content: '#ffffff',
                },
            ]}
            additionalLinkTags={[
                {
                    rel: 'apple-touch-icon',
                    href: 'icons/apple-icon-180.png',
                },
                {
                    rel: 'manifest',
                    href: '/manifest.json',
                },
            ]}
        />
    )
}

export default DefaultSeo
