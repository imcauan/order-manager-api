import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from 'src/infra/jwt/Jwt.module';
import { CryptoModule } from 'src/infra/crypto/Crypto.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    JwtModule,
    CryptoModule,
    PrismaModule,
    forwardRef(() => FileModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
