import Type from '@repositories/type'
import { useQuery } from '@tanstack/react-query'
import { CreateTypeInput, Type as TP } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchType = async (slug: string) => {
    const { data } = await Type.find(`${API_ENDPOINTS.TYPES}/${slug}`)
    return data
}

export const useTypeQuery = (slug: string) => {
    return useQuery<TP, Error>([API_ENDPOINTS.TYPES, slug], () => fetchType(slug))
}
