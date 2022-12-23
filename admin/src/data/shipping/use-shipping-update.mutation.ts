import { ShippingUpdateInput } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Shipping from '@repositories/shipping'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'

export interface IShippingUpdateVariables {
    variables: {
        id: number | string
        input: ShippingUpdateInput
    }
}

export const useUpdateShippingClassMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: IShippingUpdateVariables) =>
            Shipping.update(`${API_ENDPOINTS.SHIPPINGS}/${id}`, input),
        {
            onSuccess: () => {
                //toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries([API_ENDPOINTS.SHIPPINGS])
            },
            onError: (error: AxiosError) => {
                const errorMessage = error.isAxiosError ? error.message : 'any error'
                console.log(
                    '🚀 - file: use-shipping-update.mutation.ts:32 - useUpdateShippingClassMutation - error',
                    error
                )
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
