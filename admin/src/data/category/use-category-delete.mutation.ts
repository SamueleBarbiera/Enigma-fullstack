import { useMutation, useQueryClient } from '@tanstack/react-query'
import Category from '@repositories/category'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Category.erase(`${API_ENDPOINTS.CATEGORIES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.CATEGORIES])
        },
    })
}
