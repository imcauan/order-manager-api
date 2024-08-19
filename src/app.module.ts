import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { CryptoModule } from './infra/crypto/Crypto.module';
import { JwtModule } from './infra/jwt/Jwt.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { FileModule } from './app/file/file.module';
import { MealsModule } from './app/meals/meals.module';
import { CategoriesModule } from './app/categories/categories.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TableModule } from './app/tables/tables.module';
import { OrderModule } from './app/orders/order.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CryptoModule,
    FileModule,
    JwtModule,
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage'),
      serveStaticOptions: {
        index: false,
      },
    }),
    CategoriesModule,
    MealsModule,
    TableModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
