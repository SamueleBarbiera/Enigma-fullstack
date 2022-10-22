import Tag from '@repositories/tag'
import { useQuery } from '@tanstack/react-query'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchTag = async (id: string) => {
    const { data } = await Tag.find(`${API_ENDPOINTS.TAGS}/${id}`)
    return { tag: data }
}

export const useTagQuery = (id: string) => {
    return useQuery([API_ENDPOINTS.TAGS, id], () => fetchTag(id))
}
