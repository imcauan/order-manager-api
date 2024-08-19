import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { FileService } from '../file/file.service';
import { UpdateMealDto } from './dtos/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(
    image: Express.Multer.File,
    { name, price, category_id }: CreateMealDto,
  ) {
    console.log({ name, price, category_id, image });
    const mealExists = await this.prisma.meals.findFirst({ where: { name } });

    if (mealExists) {
      throw new ConflictException('A meal with this name already exists!');
    }

    try {
      const meal = await this.prisma.meals.create({
        data: {
          name,
          image: image.originalname,
          category_id,
          price: price as number,
        },
      });

      await this.fileService.uploadPhoto(image);

      return { id: meal.id };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async list() {
    return this.prisma.meals.findMany();
  }

  async getById(id: string) {
    try {
      const meal = await this.prisma.meals.findUnique({ where: { id } });

      if (!meal) {
        throw new NotFoundException('Meal not found.');
      }

      return meal;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, image: Express.Multer.File, data: UpdateMealDto) {
    const meal = await this.prisma.meals.findUnique({ where: { id } });

    if (!meal) {
      throw new NotFoundException('Meal not found.');
    }

    await this.prisma.meals.update({
      where: {
        id: meal.id,
      },
      data: {
        name: data.name,
        image: image.filename,
        price: data.price,
        category_id: data.category_id,
      },
    });
  }

  async delete(id: string) {
    try {
      const meal = await this.prisma.meals.findUnique({ where: { id } });

      if (!meal) {
        throw new NotFoundException('Meal not found.');
      }

      await this.prisma.meals.delete({ where: { id: meal.id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getMealsRank() {
    return this.prisma.meals.findMany({
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      include: {
        orders: true,
      },
    });
  }
}
