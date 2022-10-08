import { CreateProduct } from '@ts-types/generated'
import { ROUTES } from '@utils/routes'
import Product from '@repositories/product'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation((input: CreateProduct) => Product.create(API_ENDPOINTS.PRODUCTS, input), {
        onSuccess: async () => {
            await router.push(`/${router.query.shop as string}${ROUTES.PRODUCTS}`)
        },
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
        },
    })
}
