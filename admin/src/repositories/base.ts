/* eslint-disable @typescript-eslint/no-unsafe-call */
import http from '@utils/api/http'
import { AxiosResponse } from 'axios'

export default class Base<C, U> {
    public http = <T>(url: string, type: string, variables: T | null = null, options?: unknown) => {
        return http[type](url, variables, options) as AxiosResponse
    }
    public all = (url: string) => {
        return this.http(url, 'get')
    }

    public find = (url: string) => {
        return this.http(url, 'get')
    }

    public create = (url: string, variables: C) => {
        return this.http<C>(url, 'post', variables)
    }

    public update = (url: string, variables: U) => {
        return this.http<U>(url, 'put', variables)
    }

    public erase = (url: string) => {
        return this.http(url, 'delete')
    }
}
