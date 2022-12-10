import { QueryParamsType, QueryOptionsType } from '@ts-types/custom.types'
import { mapPaginatorData } from '@utils/data-mappers'
import { useQuery } from '@tanstack/react-query'
import User from '@repositories/user'
import { API_ENDPOINTS } from '@utils/api/endpoints'
import { UserPaginator } from '@ts-types/generated'

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
    // eslint-disable-next-line no-unused-vars
    const [_key, params] = queryKey
    const { page, text, limit = 15, orderBy = 'updated_at', sortedBy = 'DESC' } = params as QueryOptionsType
    const url = `${API_ENDPOINTS.USERS}?search=${text ?? ''}&limit=${limit}&page=${
        page ?? 0
    }&orderBy=${orderBy}&sortedBy=${sortedBy}`
    const {
        data: { data, ...rest },
    } = await User.all(url)
    return { data, paginatorInfo: mapPaginatorData({ ...rest }) }
}

const useUsersQuery = (options: QueryOptionsType) => {
    return useQuery<UserPaginator, Error>([API_ENDPOINTS.USERS, options], fetchUsers, {
        keepPreviousData: true,
    })
}

export { useUsersQuery, fetchUsers }
