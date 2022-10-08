import { ShippingInput } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Shipping from '@repositories/shipping'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export interface IShippingCreateVariables {
    variables: {
        input: ShippingInput
    }
}

export const useCreateShippingClassMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

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
        }
    )
}
