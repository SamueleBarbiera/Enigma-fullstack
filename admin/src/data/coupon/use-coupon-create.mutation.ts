import { CouponInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Coupon from '@repositories/coupon'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export interface ICouponCreateVariables {
    variables: { input: CouponInput }
}

export const useCreateCouponMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(
        ({ variables: { input } }: ICouponCreateVariables) => Coupon.create(API_ENDPOINTS.COUPONS, input),
        {
            onSuccess: async () => {
                await router.push(ROUTES.COUPONS)
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.COUPONS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'any error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
