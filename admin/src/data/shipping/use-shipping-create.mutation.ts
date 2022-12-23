import { ShippingInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Shipping from '@repositories/shipping'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export interface IShippingCreateVariables {
    variables: {
        input: ShippingInput
    }
}

export const useCreateShippingClassMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation(
        ({ variables: { input } }: IShippingCreateVariables) => Shipping.create(API_ENDPOINTS.SHIPPINGS, input),
        {
            onSuccess: async () => {
                await router.push(ROUTES.SHIPPINGS)
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.SHIPPINGS])
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
