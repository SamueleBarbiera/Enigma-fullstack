import Category from '@repositories/category'
import { useQuery } from '@tanstack/react-query'
import { CreateCategory, Category as TCategory } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchCategory = async (id: string) => {
    const { data } = await Category.find(`${API_ENDPOINTS.CATEGORIES}/${id}`)
    return data
}

export const useCategoryQuery = (id: string) => {
    return useQuery<CreateCategory, Error>([API_ENDPOINTS.CATEGORIES, id], () => fetchCategory(id))
}
