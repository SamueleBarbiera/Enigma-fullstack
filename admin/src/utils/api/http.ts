import { getAuthCredentials } from '@utils/auth-utils'
import { ROUTES } from '@utils/routes'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT, // TODO: take this api URL from env
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

// Change request data/error here
http.interceptors.request.use(
    (config) => {
        const { token } = getAuthCredentials()
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token ?? ''}`,
        }
        return config
    },
    (error: AxiosError) => {
        console.log('🚀 - file: http.ts - line 27 - error', error)
        const errorMessage = error instanceof AxiosError ? error.message : 'Unknown error'
        if (error instanceof AxiosError) console.log(`❌ Error message: ${errorMessage}`)
        return Promise.reject(errorMessage)
    }
)

// Change response data/error here
http.interceptors.response.use(
    (response) => {
        return response
    },
    (error: AxiosError) => {
        console.log('🚀 - file: http.ts - line 37 - error', error)
        if (
            (error.response && error.response.status === 401) ||
            (error.response && error.response.status === 403) ||
            (error.response && error.message === 'Enigma_ERROR.NOT_AUTHORIZED')
        ) {
            Cookies.remove('AUTH_CRED')
            void Router.push(ROUTES.LOGIN)
        }
        const errorMessage = error instanceof AxiosError ? error.message : 'Unknown error'
        if (error instanceof AxiosError) console.log(`❌ Error message: ${errorMessage}`)
        return Promise.reject(errorMessage)
    }
)

export default http
