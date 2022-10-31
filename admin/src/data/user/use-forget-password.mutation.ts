import { ForgetPasswordInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import User from '@repositories/user'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

export interface IForgetPassVariables {
    variables: { input: ForgetPasswordInput }
}

export const useForgetPasswordMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { input } }: IForgetPassVariables) => User.forgetPassword(API_ENDPOINTS.FORGET_PASSWORD, input),
        {
            onSuccess: () => {
                toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.SHOPS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
