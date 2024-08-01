import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { CryptoModule } from './infra/crypto/Crypto.module';
import { JwtModule } from './infra/jwt/Jwt.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [UserModule, AuthModule, CryptoModule, JwtModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
