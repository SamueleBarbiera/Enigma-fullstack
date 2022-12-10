import GetProduct from '@repositories/getProduct'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { Product as TProduct } from '@ts-types/generated'

export const fetchProduct = async (slug: string) => {
    const { data } = await GetProduct.find(`${API_ENDPOINTS.PRODUCTS}/${slug}`)
    return data
}

export const useProductQuery = (slug: string) => {
    return useQuery<TProduct, Error>([API_ENDPOINTS.PRODUCTS, slug], () => fetchProduct(slug))
}
