import { useMutation, useQueryClient } from '@tanstack/react-query'
import Type from '@repositories/type'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteTypeMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Type.erase(`${API_ENDPOINTS.TYPES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TYPES])
        },
    })
}
