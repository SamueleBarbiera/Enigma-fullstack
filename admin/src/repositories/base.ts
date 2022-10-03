import http from '@utils/api/http'

export default class Base<C, U> {
    public http = async <T>(url: string, type: string, variables: T | null = null, options?: any) => {
        return (http as any)[type](url, variables, options)
    }
    public all = async (url: string) => {
        return this.http(url, 'get')
    }

    public find = async (url: string) => {
        return this.http(url, 'get')
    }

    public create = async (url: string, variables: C) => {
        return this.http<C>(url, 'post', variables)
    }

    public update = async (url: string, variables: U) => {
        return this.http<U>(url, 'put', variables)
    }

    public delete = async (url: string) => {
        return this.http(url, 'delete')
    }
}
