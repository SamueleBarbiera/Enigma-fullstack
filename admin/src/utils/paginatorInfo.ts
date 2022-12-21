import { PaginatorInfo } from '@ts-types/generated'

export const getPaginatorInfo = (data: any): PaginatorInfo => {
    const latestData = data[data.length - 1] || []
    const isEmpty = latestData.length === 0
    const fetchedAllData = isEmpty || latestData.current_page === latestData.last_page
    return {
        perPage: latestData.per_page,
        currentPage: latestData.current_page,
        lastPage: latestData.last_page,
        total: latestData.total,
        hasMorePages: !fetchedAllData,
        count: fetchedAllData ? latestData.to - latestData.from + 1 : latestData.per_page,
    }
}
