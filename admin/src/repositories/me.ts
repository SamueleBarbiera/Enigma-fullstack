import { User } from '@ts-types/generated'
import Base from './base'

class UserData extends Base<User, null> {
    public me = (url: string) => {
        return this.http(url, 'get')
    }
}

export default new UserData()
