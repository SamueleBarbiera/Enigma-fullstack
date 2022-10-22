import { AxiosResponse } from 'axios'
import Base from './base'

class Upload extends Base<unknown, unknown> {
    public upload = (url: string, variables: any[]) => {
        const formData = new FormData()
        variables.forEach((attachment: string | Blob) => {
            formData.append('attachment[]', attachment)
        })
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const response: AxiosResponse<unknown, unknown> = this.http(url, 'post', formData, options)
        return response.data
    }
}

export default new Upload()
