import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types'
import { stringifySearchQuery } from '@utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import Shipping from '@repositories/shipping'
import { API_ENDPOINTS } from '@utils/api/endpoints'

const fetchShippingClasses = async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey
    const { text, orderBy = 'updated_at', sortedBy = 'DESC' } = params as QueryOptionsType
    const searchString = stringifySearchQuery({
        name: text,
    })
    const url = `${API_ENDPOINTS.SHIPPINGS}?search=${searchString}&orderBy=${orderBy}&sortedBy=${sortedBy}`
    const { data } = await Shipping.all(url)
    return { shippingClasses: data }
}

const useShippingClassesQuery = (options: QueryOptionsType = {}) => {
    return useQuery([API_ENDPOINTS.SHIPPINGS, options], fetchShippingClasses, {
        keepPreviousData: true,
    })
}

export { useShippingClassesQuery, fetchShippingClasses }
