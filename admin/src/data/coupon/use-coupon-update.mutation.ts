import { CouponUpdateInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Coupon from '@repositories/coupon'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
export interface ICouponUpdateVariables {
    variables: { id: number | string; input: CouponUpdateInput }
}
export const useUpdateCouponMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: ICouponUpdateVariables) =>
            Coupon.update(`${API_ENDPOINTS.COUPONS}/${id}`, input),
        {
            onSuccess: () => {
                toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: () => {
                void queryClient.invalidateQueries([API_ENDPOINTS.COUPONS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(t(`common:${error.message}`))
                return errorMessage
            },
        }
    )
}
