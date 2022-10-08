import { RegisterInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import User from '@repositories/user'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface IRegisterVariables {
    variables: RegisterInput
}

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation(({ variables }: IRegisterVariables) => User.register(API_ENDPOINTS.REGISTER, variables), {
        onSuccess: async () => {
            await router.push(ROUTES.USERS)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.USERS])
        },
    })
}
