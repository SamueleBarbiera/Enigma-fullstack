import { ShopInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Shop from '@repositories/shop'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { adminOnly, getAuthCredentials, hasAccess } from '@utils/auth-utils'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export interface IShopCreateVariables {
    variables: {
        input: ShopInput
    }
}

export const useCreateShopMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation(({ variables: { input } }: IShopCreateVariables) => Shop.create(API_ENDPOINTS.SHOPS, input), {
        onSuccess: async () => {
            const { permissions } = getAuthCredentials()
            if (hasAccess(adminOnly, permissions)) {
                return router.push(ROUTES.ADMIN_MY_SHOPS)
            }
            await router.push(ROUTES.DASHBOARD)
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
    })
}
