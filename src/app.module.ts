import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { CryptoModule } from './infra/crypto/Crypto.module';
import { JwtModule } from './infra/jwt/Jwt.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { FileModule } from './app/file/file.module';
import { MealsModule } from './app/meals/meals.module';
import { CategoriesModule } from './app/categories/categories.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    CryptoModule, 
    FileModule,
    JwtModule, 
    PrismaModule,
    CategoriesModule,
    MealsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
