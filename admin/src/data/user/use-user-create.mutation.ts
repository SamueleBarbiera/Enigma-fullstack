import { RegisterInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import User from '@repositories/user'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export interface IRegisterVariables {
    variables: RegisterInput
}

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation(({ variables }: IRegisterVariables) => User.register(API_ENDPOINTS.REGISTER, variables), {
        onSuccess: async () => {
            await router.push(ROUTES.USERS)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.USERS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'any error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
