import { useMutation, useQueryClient } from '@tanstack/react-query'
import Product from '@repositories/product'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient()

    return useMutation((id: string) => Product.erase(`${API_ENDPOINTS.PRODUCTS}/${id}`), {
        // Always refetch after error or success:
        onSettled: async () => {
            await queryClient.invalidateQueries([API_ENDPOINTS.PRODUCTS])
        },
    })
}
