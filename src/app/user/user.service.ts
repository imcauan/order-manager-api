import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { CryptoService } from 'src/infra/crypto/Crypto.service';
import { UpdatePutUserDto } from './dtos/update-put-user.dto';
import { UpdatePatchUserDto } from './dtos/update-patch-user.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

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
    return this.prismaClient.users.findUnique({ where: { id }});
  }

  async update(id: string, data: UpdatePutUserDto) {
    return this.prismaClient.users.update({
      data,
      where: {
        id
      }
    })
  }

  async updatePartial(id: string, data: UpdatePatchUserDto) {
    return this.prismaClient.users.update({
      data,
      where: {
        id
      }
    })
  }

  async delete(id: string) {
    return this.prismaClient.users.delete({
      where: {
        id
      }
    })
  }
}
