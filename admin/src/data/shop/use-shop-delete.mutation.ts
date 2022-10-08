import { useMutation, useQueryClient } from '@tanstack/react-query'
import Shop from '@repositories/shop'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteShopMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Shop.erase(`${API_ENDPOINTS.SHOPS}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.SHOPS])
        },
    })
}
