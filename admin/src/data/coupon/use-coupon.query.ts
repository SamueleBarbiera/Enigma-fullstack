import GetCoupon from '@repositories/GetCoupon'
import { useQuery } from '@tanstack/react-query'
import { Coupon as TCoupon } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchCoupon = async (id: string) => {
    const { data } = await GetCoupon.find(`${API_ENDPOINTS.COUPONS}/${id}`)
    return data
}

export const useCouponQuery = (id: string) => {
    return useQuery<TCoupon, Error>([API_ENDPOINTS.COUPONS, id], () => fetchCoupon(id))
}
