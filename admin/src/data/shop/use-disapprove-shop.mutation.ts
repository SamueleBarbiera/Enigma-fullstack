import Shop from '@repositories/shop'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
export interface IShopApproveVariables {
    variables: {
        id: string
    }
}

export const useDisApproveShopMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables }: IShopApproveVariables) => Shop.disapprove(API_ENDPOINTS.DISAPPROVE_SHOP, variables),
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
