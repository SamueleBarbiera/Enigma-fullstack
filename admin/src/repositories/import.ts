import { AxiosResponse } from 'axios'
import Base from './base'
interface Input {
    shop_id: string
    csv: any
}
class Import extends Base<any, any> {
    public importCsv = (url: string, variables: Input) => {
        const formData = new FormData()
        formData.append('csv', variables.csv)
        formData.append('shop_id', variables.shop_id)
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const response: AxiosResponse<unknown, unknown> = this.http(url, 'post', formData, options)
        return response.data
    }
}

export default new Import()
