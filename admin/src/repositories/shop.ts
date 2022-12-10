import Base from './base'

import { ApproveShopInput, ShopInput, AddStaffInput } from '@ts-types/generated'

class Shop extends Base<ShopInput, ShopInput> {
    public staffs = (url: string) => {
        return this.http(url, 'get')
    }

    public approve = (url: string, variables: ApproveShopInput) => {
        return this.http<ApproveShopInput>(url, 'post', variables)
    }

    public disapprove = (url: string, variables: { id: string }) => {
        return this.http<{ id: string }>(url, 'post', variables)
    }

    public addStaff = (url: string, variables: AddStaffInput) => {
        return this.http<AddStaffInput>(url, 'post', variables)
    }
    public removeStaff = (url: string, id: string) => {
        return this.http<{ id: string }>(url, 'delete', { id })
    }
}

export default new Shop()
