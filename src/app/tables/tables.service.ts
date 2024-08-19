import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateTableDto } from './dtos/create-table.dto';
import { Tables } from '@prisma/client';
import { UpdateTableDto } from './dtos/update-table.dto';

@Injectable()
export class TablesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTableDto): Promise<void> {
    const tableExists = await this.prismaService.tables.findFirst({
      where: { number: data.number },
    });

    if (tableExists) {
      throw new ConflictException('Table with this number already exists!');
    }

    try {
      await this.prismaService.tables.create({
        data: {
          number: data.number,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async list(): Promise<Tables[]> {
    return this.prismaService.tables.findMany();
  }

  async getById(id: string): Promise<Tables> {
    try {
      const table = await this.prismaService.tables.findFirst({
        where: { id },
      });

      if (!table) {
        throw new NotFoundException('Table not found');
      }

      return table;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id, data: UpdateTableDto) {
    const tableExists = await this.prismaService.tables.findUnique({
      where: { id },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    try {
      await this.prismaService.tables.update({
        where: {
          id: tableExists.id,
        },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string) {
    const tableExists = await this.prismaService.tables.findUnique({
      where: { id },
    });

    if (!tableExists) {
      throw new NotFoundException('Table not found.');
    }

    try {
      await this.prismaService.tables.delete({
        where: {
          id: tableExists.id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
