import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
('');
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }: CreateUserDto) {
    return this.userService.create({ name, email, password });
  }

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get('/rank')
  async getUserRank() {
    return this.userService.getUsersRank();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return this.userService.getById(id);
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './storage',
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Patch(':id')
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UpdateUserDto,
    @ParamId() id: string,
  ) {
    console.log({ id, data, image });
    return this.userService.update(id, data, image);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.userService.delete(id);
  }
}
