import { UpdateOrder } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Order from '@repositories/order'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

export interface IOrderUpdateVariables {
    variables: { id: string | undefined; input: UpdateOrder }
}

export const useUpdateOrderMutation = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()
    return useMutation(
        ({ variables: { id, input } }: IOrderUpdateVariables) =>
            Order.update(`${API_ENDPOINTS.ORDERS}/${id ?? ''}`, input),
        {
            onSuccess: () => {
                toast.success(t('common:update-success'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.ORDERS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
