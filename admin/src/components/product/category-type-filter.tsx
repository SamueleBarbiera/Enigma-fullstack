import Select from '@components/ui/select/select'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'next-i18next'
import Label from '@components/ui/label'
import cn from 'classnames'
import { useTypesQuery } from '@data/type/use-types.query'

interface Props {
    onTypeFilter: (slug: string) => void
    className?: string
}

export default function CategoryTypeFilter({ onTypeFilter, className }: Props) {
    const { t } = useTranslation()

    const { data, isLoading: loading } = useTypesQuery({
        limit: 999,
    })

    return (
        <div
            className={cn(
                'flex w-full flex-col space-y-5 md:flex-row md:items-end md:space-x-5 md:space-y-0',
                className
            )}
        >
            <div className="w-full">
                <Label>{t('common:filter-by-group')}</Label>
                <Select
                    options={data?.types.data}
                    isLoading={loading}
                    getOptionLabel={(option: { name: string }) => option.name}
                    getOptionValue={(option: { slug: string }) => option.slug}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    placeholder={t('common:filter-by-group-placeholder')}
                    onChange={onTypeFilter}
                />
            </div>
        </div>
    )
}
