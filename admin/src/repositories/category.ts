import { CreateCategory, UpdateCategory } from '@ts-types/generated'
import Base from './base'

class Category extends Base<CreateCategory, UpdateCategory> {
    public fetchParent = (url: string) => {
        return this.http(url, 'get')
    }
}

export default new Category()
