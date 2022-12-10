/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryParamsType } from '@ts-types/custom.types'
import { useQuery } from '@tanstack/react-query'
import Product from '@repositories/product'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { stringifySearchQuery } from '@utils/data-mappers'

const fetchPopularProducts = ({ queryKey }: QueryParamsType) => {
    // eslint-disable-next-line no-unused-vars
    const [_key, params] = queryKey
    const { limit = 15, shop_id } = params as { limit: number; shop_id: number }
    const searchString = stringifySearchQuery({
        shop_id,
    })
    const url = `${API_ENDPOINTS.POPULAR_PRODUCTS}?search=${searchString}&limit=${limit}`
    const data = Product.popularProducts(url)
    return data
}

const usePopularProductsQuery = (options: { limit: number; shop_id?: number }) => {
    return useQuery([API_ENDPOINTS.POPULAR_PRODUCTS, options], fetchPopularProducts)
}

export { usePopularProductsQuery, fetchPopularProducts }
