import GetOrder from '@repositories/getOrder'
import { useQuery } from '@tanstack/react-query'
import { Order as TOrder } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchOrder = async (id: string) => {
    const { data } = await GetOrder.find(`${API_ENDPOINTS.ORDERS}/${id}`)
    return data
}

export const useOrderQuery = (id: string) => {
    return useQuery<TOrder, Error>([API_ENDPOINTS.ORDERS, id], () => fetchOrder(id))
}
