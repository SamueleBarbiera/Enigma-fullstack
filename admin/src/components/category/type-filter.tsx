import Select from '@components/ui/select/select'
import React from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'
import { useTypesQuery } from '@data/type/use-types.query'

interface Props {
    onTypeFilter: { slug: string }
    className?: string
}

export default function TypeFilter({ onTypeFilter, className }: Props) {
    const { t } = useTranslation()

    const { data, isLoading: loading } = useTypesQuery({
        limit: 999,
    })

    return (
        <div className={cn('flex w-full', className)}>
            <div className="w-full">
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
