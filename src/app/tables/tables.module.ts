import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { TablesController } from './tables.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [TablesController],
  exports: [TablesService],
  providers: [TablesService],
})
export class TableModule {}
