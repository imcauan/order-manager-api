import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto {
  status: OrderStatus;
}
