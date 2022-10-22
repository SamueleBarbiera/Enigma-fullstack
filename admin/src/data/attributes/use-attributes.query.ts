import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types'
import { stringifySearchQuery } from '@utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import Attribute from '@repositories/attribute'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { Attribute as TAttribute } from '@ts-types/generated'

const fetchAttributes = async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey
    const { text, shop_id, orderBy = 'updated_at', sortedBy = 'desc' } = params as QueryOptionsType
    const searchString = stringifySearchQuery({
        name: text,
        shop_id: shop_id,
    })
    const url = `${API_ENDPOINTS.ATTRIBUTES}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`
    const { data } = await Attribute.all(url)
    return data
}

const useAttributesQuery = (params: QueryOptionsType = {}, options = {}) => {
    return useQuery<TAttribute, Error>([API_ENDPOINTS.ATTRIBUTES, params], fetchAttributes, {
        ...options,
        keepPreviousData: true,
    })
}

export { useAttributesQuery, fetchAttributes }
