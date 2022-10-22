import { OrderPaginator, PaginatorInfo } from '@ts-types/generated'

export const getPaginatorInfo = (data: OrderPaginator): PaginatorInfo => {
    if (data.data.length) {
        const dataIndex = data.data.length - 1
        const isEmpty = data.data[dataIndex]?.length === 0
        const fetchedAllData =
            isEmpty || (data.data && data.data[dataIndex]?.current_page === data.data[dataIndex]?.last_page)

        const total = data.data[dataIndex]?.total
        const perPage = data.data[dataIndex]?.per_page
        const currentPage = data.data[dataIndex]?.current_page
        const lastPage = data.data[dataIndex]?.last_page
        const count = data.data[dataIndex]?.to + 1 - data.data[dataIndex]?.from

        return {
            perPage,
            currentPage,
            lastPage,
            total,
            hasMorePages: !fetchedAllData,
            count,
        }
    }
    return {
        perPage: 0,
        currentPage: 0,
        lastPage: 0,
        total: 0,
        hasMorePages: false,
        count: 0,
    }
}
