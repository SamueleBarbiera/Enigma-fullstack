import { OrderService, VerifyCheckoutInputType } from '@framework/orders/order.service'
import { useMutation } from '@tanstack/react-query'

export const useVerifyCheckoutMutation = () => {
    return useMutation((input: VerifyCheckoutInputType) => OrderService.verifyCheckout(input))
}
