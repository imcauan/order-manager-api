import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { FileController } from './file.controller';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [FileController],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
