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
import { MealsService } from './meals.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMealDto } from './dtos/create-meal.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../user/enums/role.enum';
import { diskStorage } from 'multer';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdateMealDto } from './dtos/update-meal.dto';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
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
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateMealDto,
  ) {
    return this.mealsService.create(image, data);
  }

  @Get()
  async list() {
    return this.mealsService.list();
  }

  @Get('/rank')
  async getRank() {
    return this.mealsService.getMealsRank();
  }

  @Get(':id')
  async getById(@ParamId() id: string) {
    return this.mealsService.getById(id);
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
    @ParamId() id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() data: UpdateMealDto,
  ) {
    return this.mealsService.update(id, image, data);
  }

  @Delete('/:id')
  async delete(@ParamId() id: string) {
    return this.mealsService.delete(id);
  }
}
