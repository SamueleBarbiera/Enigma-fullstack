import { useMutation, useQueryClient } from '@tanstack/react-query'
import Attribute from '@repositories/attribute'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteAttributeMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Attribute.erase(`${API_ENDPOINTS.ATTRIBUTES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTES])
        },
    })
}
