import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types'
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import GetOrderStatus from '@repositories/GetOrderStatus'
import { API_ENDPOINTS } from '@utils/api/endpoints'

const fetchOrderStatuses = async ({ queryKey }: QueryParamsType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [_key, params] = queryKey
    const { page, text, limit = 15, orderBy = 'serial', sortedBy = 'ASC' } = params as QueryOptionsType
    const searchString = stringifySearchQuery({
        name: text,
    })
    const url = `${API_ENDPOINTS.ORDER_STATUS}?search=${searchString}&limit=${limit}&page=${
        page ?? 0
    }&orderBy=${orderBy}&sortedBy=${sortedBy}`
    const {
        data: { data, ...rest },
    } = await GetOrderStatus.all(url)
    return {
        order_statuses: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
    }
}

const useOrderStatusesQuery = (options: QueryOptionsType) => {
    return useQuery([API_ENDPOINTS.ORDER_STATUS, options], fetchOrderStatuses, {
        keepPreviousData: true,
    })
}

export { useOrderStatusesQuery, fetchOrderStatuses }
