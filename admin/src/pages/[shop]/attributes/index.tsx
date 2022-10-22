import Card from '@components/common/card'
import AttributeList from '@components/attribute/attribute-list'
import ErrorMessage from '@components/ui/error-message'
import LinkButton from '@components/ui/link-button'
import Loader from '@components/ui/loader/loader'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ShopLayout from '@components/layouts/shop'
import { useRouter } from 'next/router'
import { adminOwnerAndStaffOnly } from '@utils/auth-utils'
import { useAttributesQuery } from '@data/attributes/use-attributes.query'
import { useShopQuery } from '@data/shop/use-shop.query'
import { useState } from 'react'
import { SortOrder } from '@ts-types/generated'
import { useModalAction } from '@components/ui/modal/modal.context'
import { MoreIcon } from '@components/icons/more-icon'
import Button from '@components/ui/button'
import { GetServerSideProps } from 'next'

export default function AttributePage() {
    const {
        query: { shop },
    } = useRouter()
    const { t } = useTranslation()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { openModal } = useModalAction()
    const [orderBy, setOrder] = useState('updated_at')
    const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc)
    const { data: shopData, isLoading: fetchingShop } = useShopQuery(shop as string)
    console.log('🚀 - file: index.tsx - line 30 - AttributePage - shopData', shopData)
    const shopId = shopData?.shop.id
    function handleImportModal() {
        openModal('EXPORT_IMPORT_ATTRIBUTE', shopId)
    }
    const {
        data,
        isLoading: loadingAttributes,
        error,
    } = useAttributesQuery(
        {
            shop_id: Number(shopId),
            orderBy,
            sortedBy,
        },
        {
            enabled: Boolean(shopId),
        }
    )
    console.log('🚀 - file: index.tsx - line 41 - AttributePage - data', data)
    if (loadingAttributes && fetchingShop) return <Loader text={t('common:text-loading')} />
    if (error && error instanceof Error) {
        return <ErrorMessage message={error.message} />
    }
    return (
        <>
            <Card className="mb-8 flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">{t('common:sidebar-nav-item-attributes')}</h1>
                </div>

                <div className="flex w-full flex-col items-center ms-auto md:w-3/4 md:flex-row xl:w-2/4">
                    <LinkButton
                        href={`/${shop as string}/attributes/create`}
                        className="mt-5 h-12 w-full md:mt-0 md:w-auto md:ms-auto"
                    >
                        <span>
                            + {t('form:button-label-add')} {t('common:attribute')}
                        </span>
                    </LinkButton>

                    <Button onClick={handleImportModal} className="mt-5 w-full md:hidden">
                        {t('common:text-export-import')}
                    </Button>
                    <button
                        onClick={handleImportModal}
                        className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition duration-300 ms-6 hover:bg-gray-100 md:flex"
                    >
                        <MoreIcon className="w-3.5 text-body" />
                    </button>
                </div>
            </Card>
            <AttributeList attributes={data} onOrder={setOrder} onSort={setColumn} />
        </>
    )
}
AttributePage.authenticate = {
    permissions: adminOwnerAndStaffOnly,
}
AttributePage.Layout = ShopLayout
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['table', 'common', 'form'])),
    },
})
