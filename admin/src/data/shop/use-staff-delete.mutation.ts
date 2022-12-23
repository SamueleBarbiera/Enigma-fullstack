import { useMutation, useQueryClient } from '@tanstack/react-query'
import Shop from '@repositories/shop'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useRemoveStaffMutation = () => {
    const queryClient = useQueryClient()

    const { t } = useTranslation()
    return useMutation((id: string) => Shop.removeStaff(`${API_ENDPOINTS.REMOVE_STAFF}/${id}`, id), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.STAFFS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'any error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
