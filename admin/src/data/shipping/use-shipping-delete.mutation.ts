import { useMutation, useQueryClient } from '@tanstack/react-query'
import Shipping from '@repositories/product'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useDeleteShippingClassMutation = () => {
    const queryClient = useQueryClient()

    const { t } = useTranslation()
    return useMutation((id: string) => Shipping.erase(`${API_ENDPOINTS.SHIPPINGS}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.SHIPPINGS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'any error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
