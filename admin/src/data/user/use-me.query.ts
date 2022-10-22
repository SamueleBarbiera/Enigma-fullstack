import UserData from '@repositories/me'
import { useQuery } from '@tanstack/react-query'
import { User as TUser } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/endpoints'

export const fetchMe = async () => {
    const { data } = await UserData.me(API_ENDPOINTS.ME)
    console.log('🚀 - file: use-me.query.ts - line 8 - fetchMe - data', data)
    return data
}

export const useMeQuery = () => {
    return useQuery([API_ENDPOINTS.ME], () => fetchMe())
}
