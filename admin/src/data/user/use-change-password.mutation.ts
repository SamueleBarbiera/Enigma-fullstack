import { ChangePasswordInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import User from '@repositories/user'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

export interface IChangePassVariables {
    variables: { input: ChangePasswordInput }
}

export const useChangePasswordMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    return useMutation(
        ({ variables: { input } }: IChangePassVariables) => User.changePassword(API_ENDPOINTS.CHANGE_PASSWORD, input),
        {
            onSuccess: () => {
                //toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.SHOPS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'any error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
