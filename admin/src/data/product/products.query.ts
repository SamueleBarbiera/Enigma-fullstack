import { QueryParamsType, ProductsQueryOptionsType } from '@ts-types/custom.types'
import { mapPaginatorData, stringifySearchQuery } from '@utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import Product from '@repositories/product'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { ProductPaginator } from '@ts-types/generated'
import GetProductPagination from '@repositories/GetProductPagination'

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey
    const {
        page,
        text,
        type,
        category,
        shop_id,
        status,
        limit = 15,
        orderBy = 'updated_at',
        sortedBy = 'DESC',
    } = params as ProductsQueryOptionsType
    const searchString = stringifySearchQuery({
        name: text,
        type,
        category,
        status,
        shop_id,
    })
    const url = `${API_ENDPOINTS.PRODUCTS}?search=${searchString}&searchJoin=and&limit=${limit}&page=${
        page ?? 0
    }&orderBy=${orderBy}&sortedBy=${sortedBy}`
    const {
        data: { data, ...rest },
    } = await GetProductPagination.all(url)
    return { data, paginatorInfo: mapPaginatorData({ ...rest }) }
}

const useProductsQuery = (params: ProductsQueryOptionsType, options = {}) => {
    return useQuery<ProductPaginator, Error>([API_ENDPOINTS.PRODUCTS, params], fetchProducts, {
        ...options,
        keepPreviousData: true,
    })
}

export { useProductsQuery, fetchProducts }
