import { QueryKey } from 'react-query'
import { SortOrder } from './generated'

export interface CategoriesQueryOptionsType {
    type?: string
    text?: string
    page?: number
    parent?: number | null
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface TagsQueryOptionsType {
    type?: string
    text?: string
    page?: number
    parent?: number | null
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface ShopsQueryOptionsType {
    text?: string
    page?: number
    parent?: number | null
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface WithdrawsQueryOptionsType {
    text?: string
    shop_id?: number
    page?: number
    parent?: number | null
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface ProductsQueryOptionsType {
    page?: number
    shop_id?: number
    text?: string
    type?: string
    category?: string
    status?: string
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface TypesQueryOptionsType {
    page?: number
    text?: string
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}
export interface StaffsQueryOptionsType {
    page?: number
    shop_id?: number
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}

export interface QueryOptionsType {
    page?: number
    text?: string
    shop_id?: number
    limit?: number
    orderBy?: string
    sortedBy?: SortOrder
}

export interface QueryParamsType {
    queryKey: QueryKey
    pageParam?: string
}
