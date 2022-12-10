import { useMutation, useQueryClient } from '@tanstack/react-query'
import AttributeValue from '@repositories/attribute'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'

export const useDeleteAttributeValueMutation = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation((id: string) => AttributeValue.erase(`${API_ENDPOINTS.ATTRIBUTE_VALUES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTE_VALUES])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
