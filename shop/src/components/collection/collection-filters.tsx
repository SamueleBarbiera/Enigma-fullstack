import React from 'react'
import { useTranslation } from 'next-i18next'
import ActiveLink from '@components/ui/active-link'
import { ROUTES } from '@lib/routes'
import { useTagsQuery } from '@framework/tags/tags.query'
import { useUI } from '@contexts/ui.context'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export const CollectionFilters = () => {
    const { t } = useTranslation('common')
    const { closeFilter } = useUI()
    const { data, isLoading: loading } = useTagsQuery({})
    const {
        query: { tags },
    } = useRouter()

    if (loading) return null

    const items = data?.pages?.[0]?.data

    return (
        <div className="pt-1">
            <div className="mb-7 block border-b border-gray-300 pb-3 xl:pb-5">
                <div className="mb-2.5 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-heading md:text-xl lg:text-2xl">
                        {t('text-collection-list')}
                    </h2>
                </div>
            </div>
            <div className="block pb-7">
                <ul className="mt-2 flex flex-col space-y-5">
                    {items?.map((item: any) => (
                        <li key={item.id} className="cursor-pointer text-sm lg:text-[15px]" onClick={closeFilter}>
                            <ActiveLink href={`${ROUTES.COLLECTIONS}/${item.slug}`} activeClassName={''}>
                                <div
                                    className={classNames(
                                        'block py-0.5 text-heading transition duration-300 ease-in-out hover:font-semibold',
                                        tags === item?.slug && 'font-semibold'
                                    )}
                                >
                                    {item.name}
                                </div>
                            </ActiveLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
