/* eslint-disable @typescript-eslint/no-unsafe-call */
import http from '@utils/api/http'
import { AxiosResponse } from 'axios'

export default class Base<C, U> {
    public http = async <T>(url: string, type: string, variables: T | null = null, options?: any) => {
        return (await http[type](url, variables, options)) as AxiosResponse<C, U>
    }

    public all = async (url: string) => {
        return await this.http(url, 'get')
    }

    public find = async (url: string) => {
        return await this.http<C>(url, 'get')
    }

    public create = async (url: string, variables: C) => {
        return await this.http<C>(url, 'post', variables)
    }

    public update = async (url: string, variables: U) => {
        return await this.http<U>(url, 'put', variables)
    }

    public erase = async (url: string) => {
        return await this.http(url, 'delete')
    }
}
