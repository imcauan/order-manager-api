import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { IRevenueChart } from './dtos/IRevenueChart';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateOrderDto) {
    try {
      await this.prismaService.orders.create({
        data: {
          author_name: data.author_name,
          user_id: data.user_id,
          total: data.total,
          table_id: data.table_id,
          meals: {
            connect: data.meals,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async list() {
    return this.prismaService.orders.findMany({ include: { meals: true } });
  }

  async getById(id: string) {
    try {
      const order = await this.prismaService.orders.findUnique({
        where: { id },
        include: {
          meals: true,
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found.');
      }

      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getChartData() {
    const orders = await this.prismaService.orders.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const chartData = [
      {
        month: 'January',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 0)].length,
      },
      {
        month: 'February',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 1)].length,
      },
      {
        month: 'March',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 2)].length,
      },
      {
        month: 'April',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 3)].length,
      },
      {
        month: 'May',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 4)].length,
      },
      {
        month: 'June',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 5)].length,
      },
      {
        month: 'July',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 6)].length,
      },
      {
        month: 'August',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 7)].length,
      },
      {
        month: 'September',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 8)].length,
      },
      {
        month: 'October',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 9)].length,
      },
      {
        month: 'November',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 10)].length,
      },
      {
        month: 'December',
        orders: [...orders.filter((o) => o.createdAt.getMonth() === 11)].length,
      },
    ];

    return chartData;
  }

  async getRevenueChartData() {
    const percentageMeals: IRevenueChart[] = [];
    const meals = await this.prismaService.meals.findMany({
      include: {
        orders: true,
      },
    });
    const orders = await this.prismaService.orders.findMany();

    const totalRevenue = orders
      ?.map((o) => +o.total)
      .reduce((accum, num) => accum + num, 0);

    for (const meal of meals) {
      percentageMeals.push({
        name: meal.name,
        percentage: Math.round(
          ((+meal.price * meal.orders.length) / +totalRevenue) * 100,
        ),
      });
    }

    return percentageMeals;
  }

  async update(id: string, data: UpdateOrderDto) {
    const order = await this.prismaService.orders.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    try {
      await this.prismaService.orders.update({
        where: { id },
        data: { status: data.status },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string) {
    const order = await this.prismaService.orders.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    try {
      await this.prismaService.orders.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
