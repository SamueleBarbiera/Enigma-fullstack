import Base from './base'

class Import extends Base<any, any> {
    public importCsv = async (url: string, variables: any) => {
        const formData = new FormData()
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
