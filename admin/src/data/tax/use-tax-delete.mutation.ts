import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tax from '@repositories/tax'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteTaxMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Tax.erase(`${API_ENDPOINTS.TAXES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TAXES])
        },
    })
}
