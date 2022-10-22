import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tax from '@repositories/tax'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useDeleteTaxMutation = () => {
    const queryClient = useQueryClient()

    const { t } = useTranslation()
    return useMutation((id: string) => Tax.erase(`${API_ENDPOINTS.TAXES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TAXES])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
