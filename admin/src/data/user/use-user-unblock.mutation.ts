import { useMutation, useQueryClient } from '@tanstack/react-query'
import User from '@repositories/user'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const useUnblockUserMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: number) => User.unblock(API_ENDPOINTS.UNBLOCK_USER, { id }), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.USERS])
            await queryClient.invalidateQueries([API_ENDPOINTS.STAFFS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
