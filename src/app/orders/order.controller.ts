import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get()
  async list() {
    return this.orderService.list();
  }

  @Get('/chart')
  async getOrderChart() {
    return this.orderService.getChartData();
  }

  @Get('/revenue')
  async getRevenueChart() {
    return this.orderService.getRevenueChartData();
  }

  @Get(':id')
  async getById(@ParamId() id: string) {
    return this.orderService.getById(id);
  }

  @Patch(':id')
  async update(@ParamId() id: string, @Body() data: UpdateOrderDto) {
    console.log({ id, data });
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.orderService.delete(id);
  }
}
