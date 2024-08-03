import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateOrderDto) {
    try {
      const order = await this.prismaService.orders.create({
        data: {
          status: data.status,
          user_id: data.user_id,
          table_id: data.table_id,
          meals: {
            create: data.meals,
          },
        },
      });

      return {
        id: order.id,
        status: order.status,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async list() {
    return this.prismaService.orders.findMany();
  }

  async getById(id: string) {
    try {
      const order = await this.prismaService.orders.findUnique({ where: { id }});

      if(!order) {
        throw new NotFoundException("Order not found.");
      }

      return order;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }

  async update(id: string, data: UpdateOrderDto) {
     const order = await this.prismaService.orders.findUnique({ where: { id }});

     if(!order) {
        throw new NotFoundException("Order not found.");
     }

     try {
        await this.prismaService.orders.update({ where: { id }, data: { status: data.status }});
     } catch (error) {
        throw new BadRequestException(error.message);
     }
  }

  async delete(id: string) {
    const order = await this.prismaService.orders.findUnique({ where: { id }});

     if(!order) {
        throw new NotFoundException("Order not found.");
     }

     try {
      await this.prismaService.orders.delete({ where: { id }});
   } catch (error) {
      throw new BadRequestException(error.message);
   }
  }
}
