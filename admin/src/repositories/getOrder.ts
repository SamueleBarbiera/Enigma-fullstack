import { CheckoutVerificationInput, Order } from '@ts-types/generated'
import Base from './base'

class GetOrder extends Base<Order, Order> {
    public verify = (url: string, variables: CheckoutVerificationInput) => {
        return this.http<CheckoutVerificationInput>(url, 'post', variables)
    }
}

export default new GetOrder()
