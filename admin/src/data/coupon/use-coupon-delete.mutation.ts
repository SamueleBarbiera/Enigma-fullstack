import { useMutation, useQueryClient } from '@tanstack/react-query'
import Coupon from '@repositories/coupon'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteCouponMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Coupon.erase(`${API_ENDPOINTS.COUPONS}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.COUPONS])
        },
    })
}
