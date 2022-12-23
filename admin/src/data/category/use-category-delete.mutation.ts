import { useMutation, useQueryClient } from '@tanstack/react-query'
import Category from '@repositories/category'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient()

    const { t } = useTranslation()
    return useMutation((id: string) => Category.erase(`${API_ENDPOINTS.CATEGORIES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.CATEGORIES])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'any error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
