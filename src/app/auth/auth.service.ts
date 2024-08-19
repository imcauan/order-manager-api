import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CryptoService } from 'src/infra/crypto/Crypto.service';
import { JwtService } from 'src/infra/jwt/Jwt.service';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthPayloadDto } from 'src/infra/jwt/dtos/auth-payload.dto';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly PrismaClient: PrismaService,
    private readonly JWTService: JwtService,
    private readonly CryptoService: CryptoService,
  ) {}

  async register(data: AuthRegisterDto) {
    const userByEmail = await this.PrismaClient.users.findFirst({
      where: { email: data.email },
    });

    if (userByEmail) {
      throw new ConflictException('A user with this email already exists!');
    }

    const hashedPassword = await this.CryptoService.hash(data.password);

    const user = await this.PrismaClient.users.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role ?? 1,
      },
    });

    const token = await this.JWTService.sign<AuthPayloadDto>(
      {
        id: user.id,
        role: user.role,
      },
      '1h',
    );

    return {
      token: token,
    };
  }

  async login(data: AuthLoginDto) {
    const user = await this.PrismaClient.users.findFirst({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Email or password might be wrong');
    }

    const passwordMatches = await this.CryptoService.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Email or password might be wrong');
    }

    const token = await this.JWTService.sign<AuthPayloadDto>(
      {
        id: user.id,
        role: user.role,
      },
      '1h',
    );

    return {
      token: token,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify<AuthPayloadDto>(token);

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
