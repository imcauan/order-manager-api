import { Body, Controller } from "@nestjs/common";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrderService } from "./order.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { UpdateOrderDto } from "./dtos/update-order.dto";

@Controller("orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    async create(@Body() data: CreateOrderDto) {
        return this.orderService.create(data);
    }

    async list() {
        return this.orderService.list();
    }

    async getById(@ParamId() id: string) {
        return this.orderService.getById(id);
    }

    async update(@ParamId() id: string, data: UpdateOrderDto) {
        return this.orderService.update(id, data);
    }

    async delete(@ParamId() id: string) {
        return this.orderService.delete(id);
    }
} 