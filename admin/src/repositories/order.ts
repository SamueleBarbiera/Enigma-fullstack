import { CheckoutVerificationInput, CreateOrder, UpdateOrder } from '@ts-types/generated'
import Base from './base'

class Order extends Base<CreateOrder, UpdateOrder> {
    public verify = (url: string, variables: CheckoutVerificationInput) => {
        return this.http<CheckoutVerificationInput>(url, 'post', variables)
    }
}

export default new Order()
