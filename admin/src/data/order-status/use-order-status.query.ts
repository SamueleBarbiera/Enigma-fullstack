import OrderStatus from '@repositories/order-status'
import { useQuery } from '@tanstack/react-query'
import { OrderStatusInput as TOrderStatusInput } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchOrderStatus = async (slug: string) => {
    const { data } = await OrderStatus.find(`${API_ENDPOINTS.ORDER_STATUS}/${slug}`)
    return data
}

export const useOrderStatusQuery = (identifier: string) => {
    return useQuery<TOrderStatusInput, Error>([API_ENDPOINTS.ORDER_STATUS, identifier], () =>
        fetchOrderStatus(identifier)
    )
}
