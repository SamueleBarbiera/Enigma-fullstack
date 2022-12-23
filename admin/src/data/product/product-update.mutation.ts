import { UpdateProduct } from '@ts-types/generated'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Product from '@repositories/product'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { useTranslation } from 'next-i18next'
import { AxiosError, ResponseType } from 'axios'

export interface IProductUpdateVariables {
    variables: { id: string; input: UpdateProduct }
}

export const useUpdateProductMutation = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    return useMutation(
        ({ variables: { id, input } }: IProductUpdateVariables) =>
            Product.update(`${API_ENDPOINTS.PRODUCTS}/${id}`, input),
        {
            onSuccess: () => {
                //toast.success(t('common:successfully-updated'))
            },
            // Always refetch after error or success:
            onSettled: async () => {
                await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
            },
            onError: (error: AxiosError<ResponseType>) => {
                const errorMessage = error.isAxiosError ? error.message : 'any error'
                if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
                toast.error(JSON.stringify(error))
                return errorMessage
            },
        }
    )
}
