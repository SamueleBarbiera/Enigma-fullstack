import { Product as TProduct } from '@ts-types/generated'
import Base from './base'

class GetProduct extends Base<TProduct, TProduct> {
    public product = (url: string) => {
        return this.http(url, 'get')
    }
}

export default new GetProduct()
