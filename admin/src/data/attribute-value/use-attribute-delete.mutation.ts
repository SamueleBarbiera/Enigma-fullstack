import { useMutation, useQueryClient } from '@tanstack/react-query'
import AttributeValue from '@repositories/attribute'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteAttributeValueMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => AttributeValue.erase(`${API_ENDPOINTS.ATTRIBUTE_VALUES}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.ATTRIBUTE_VALUES])
        },
    })
}
