import { OrderStatusInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import OrderStatus from '@repositories/order-status'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export interface IOrderStatusCreateVariables {
    variables: {
        input: OrderStatusInput
    }
}

export const useCreateOrderStatusMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation(
        ({ variables: { input } }: IOrderStatusCreateVariables) =>
            OrderStatus.create(API_ENDPOINTS.ORDER_STATUS, input),
        {
            onSuccess: async () => {
                await router.push(ROUTES.ORDER_STATUS)
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.ORDER_STATUS])
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
