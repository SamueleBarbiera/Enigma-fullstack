import Container from '@components/ui/container'
import { getLayout } from '@components/layout/layout'

import StickyBox from 'react-sticky-box'
import ActiveLink from '@components/ui/active-link'
import { BreadcrumbItems } from '@components/common/breadcrumb'
import { ROUTES } from '@lib/routes'
import { useTranslation } from 'next-i18next'
import { CollectionFilters } from '@components/collection/collection-filters'
import { useRouter } from 'next/router'
import CollectionProductsBlock from '@components/collection/collection-products-block'

export { getStaticPaths, getStaticProps } from '@framework/ssr/tags'

export default function Collections() {
    const { query } = useRouter()
    const { t } = useTranslation('common')

    return (
        <div className="border-t-2 border-borderBottom">
            <Container>
                <div className={`flex pt-8 pb-10 lg:pb-16 xl:pb-20`}>
                    <div className="hidden w-72 flex-shrink-0 ltr:pr-8 rtl:pl-8 lg:block xl:w-80 ltr:xl:pr-12 rtl:xl:pl-12 2xl:w-96 ltr:2xl:pr-24 rtl:2xl:pl-24">
                        <StickyBox offsetTop={50} offsetBottom={20}>
                            <div className="pb-5 pt-1 xl:pb-7">
                                <BreadcrumbItems separator="/">
                                    <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                                        <> {t('breadcrumb-home')}</>
                                    </ActiveLink>
                                    <ActiveLink
                                        href={ROUTES.SEARCH}
                                        activeClassName="font-semibold text-heading capitalize"
                                    >
                                        <>{t('breadcrumb-collection')}</>
                                    </ActiveLink>
                                </BreadcrumbItems>
                            </div>
                            <CollectionFilters />
                        </StickyBox>
                    </div>

                    <div className="w-full ltr:xl:-ml-4 rtl:xl:-mr-4 ltr:2xl:-ml-9 rtl:2xl:-mr-9">
                        <CollectionProductsBlock tagSlug={query?.tags as string} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

Collections.getLayout = getLayout
