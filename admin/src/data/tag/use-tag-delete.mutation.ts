import { useMutation, useQueryClient } from '@tanstack/react-query'
import Tag from '@repositories/tag'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteTagMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Tag.erase(`${API_ENDPOINTS.TAGS}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.TAGS])
        },
    })
}
