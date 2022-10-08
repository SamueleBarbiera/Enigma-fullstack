import { useMutation, useQueryClient } from '@tanstack/react-query'
import User from '@repositories/user'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useBlockUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: number) => User.block(API_ENDPOINTS.BLOCK_USER, { id }), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.USERS])
            await queryClient.invalidateQueries([API_ENDPOINTS.STAFFS])
        },
    })
}
