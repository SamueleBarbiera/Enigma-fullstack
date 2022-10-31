import { OrderStatusPaginator } from '@ts-types/generated'
import Base from './base'

class GetOrderStatus extends Base<OrderStatusPaginator, OrderStatusPaginator> {}

export default new GetOrderStatus()
