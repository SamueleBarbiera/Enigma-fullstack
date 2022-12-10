import { PaginatorInfo } from '@ts-types/generated'
import camelcaseKeys from 'camelcase-keys'
import { Dictionary } from 'lodash'
import pickBy from 'lodash/pickBy'

type PaginatorInfoType = Record<string, unknown>

export const mapPaginatorData = (obj: PaginatorInfoType): PaginatorInfo => {
    const formattedValues: PaginatorInfo = camelcaseKeys(obj)
    return {
        ...formattedValues,
        hasMorePages: formattedValues.lastPage !== formattedValues.currentPage,
    }
}

export const stringifySearchQuery = (values: {
    shop_id?: number | undefined
    name?: string | undefined
    type?: string | undefined
    code?: string | undefined
    tracking_number?: string | undefined
    category?: string | undefined
    status?: string | undefined
}) => {
    const parsedValues: Dictionary<string | number> = pickBy(values)
    return Object.keys(parsedValues)
        .map((k) => {
            if (k === 'type') {
                return `${k}.slug:${parsedValues[k]};`
            }
            if (k === 'category') {
                return `categories.slug:${parsedValues[k]};`
            }
            return `${k}:${parsedValues[k]};`
        })
        .join('')
        .slice(0, -1)
}
