import Base from './base'

import { ApproveShopInput, ShopInput, AddStaffInput } from '@ts-types/generated'

class Shop extends Base<ShopInput, ShopInput> {
    public staffs = (url: string) => {
        return this.http(url, 'get')
    }

    public approve = async (url: string, variables: ApproveShopInput) => {
        return this.http<ApproveShopInput>(url, 'post', variables)
    }

    public disapprove = async (url: string, variables: { id: string }) => {
        return this.http<{ id: string }>(url, 'post', variables)
    }

    public addStaff = async (url: string, variables: AddStaffInput) => {
        return this.http<AddStaffInput>(url, 'post', variables)
    }
    public removeStaff = async (url: string, id: string) => {
        return this.http<{ id: string }>(url, 'delete', { id })
    }
}

export default new Shop()
