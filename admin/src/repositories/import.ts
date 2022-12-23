import { AxiosResponse } from 'axios'
import Base from './base'
interface Input {
    shop_id: string
    csv: any
}
class Import extends Base<any, any> {
    importCsv = async (url: string, variables: any) => {
        let formData = new FormData()
        formData.append('csv', variables?.csv)
        formData.append('shop_id', variables?.shop_id)
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const response = await this.http(url, 'post', formData, options)
        return response.data
    }
}

export default new Import()
