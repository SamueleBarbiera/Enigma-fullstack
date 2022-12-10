import http from '@utils/api/http'
import { AxiosError, AxiosResponse } from 'axios'
import { Analytics as TAnalytics } from '@ts-types/generated'

class Analytics {
    public analytics = async (url: string) => {
        {
            try {
                const response: AxiosResponse<TAnalytics, AxiosError> = await http.get(url)
                if (response.status === 200 || response.status === 201) {
                    return response.data
                }
                throw new Error()
            } catch (error) {
                if (error instanceof Error) {
                    const errorMessage = error.message
                    console.log(`❌ Error message: ${errorMessage}`)
                }
            }
        }
    }
}

export default new Analytics()
