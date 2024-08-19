import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CategoriesService } from './categories.service';
import { AuthModule } from 'src/app/auth/auth.module';
import { UserModule } from 'src/app/user/user.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [CategoriesController],
  exports: [CategoriesService],
  providers: [CategoriesService],
})
export class CategoriesModule {}
