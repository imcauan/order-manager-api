import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CryptoService } from 'src/infra/crypto/Crypto.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaClient: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await this.cryptoService.hash(data.password);
    return this.prismaClient.users.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: hashedPassword,
      },
    });
  }

  async list() {
    return this.prismaClient.users.findMany();
  }

  async getById(id: string) {
    return this.prismaClient.users.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateUserDto, image: Express.Multer.File) {
    return this.prismaClient.users.update({
      data: {
        email: data.email,
        name: data.name,
        image: image.filename,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return this.prismaClient.users.delete({
      where: {
        id,
      },
    });
  }

  async getUsersRank() {
    return this.prismaClient.users.findMany({
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
