import Coupon from '@repositories/coupon'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchCoupon = (id: string) => {
    const data = Coupon.find(`${API_ENDPOINTS.COUPONS}/${id}`)
    return data
}

export const useCouponQuery = (id: string) => {
    return useQuery([API_ENDPOINTS.COUPONS, id], () => fetchCoupon(id))
}
