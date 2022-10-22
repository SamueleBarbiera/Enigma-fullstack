import { CreateProduct } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Product from '@repositories/product'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const { t } = useTranslation()
    return useMutation((input: CreateProduct) => Product.create(API_ENDPOINTS.PRODUCTS, input), {
        onSuccess: async () => {
            await router.push(`/${router.query.shop as string}${ROUTES.PRODUCTS}`)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
        },
        onError: (error: AxiosError) => {
            const errorMessage = error.isAxiosError ? error.message : 'Unknown error'
            if (error.isAxiosError) console.log(`❌ Error message: ${errorMessage}`)
            toast.error(JSON.stringify(error))
            return errorMessage
        },
    })
}
