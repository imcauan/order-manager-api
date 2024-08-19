import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from '../user/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTableDto } from './dtos/create-table.dto';
import { TablesService } from './tables.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdateTableDto } from './dtos/update-table.dto';

@Controller('tables')
@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(@Body() data: CreateTableDto) {
    return this.tablesService.create(data);
  }

  @Get()
  async list() {
    return this.tablesService.list();
  }

  @Get(':id')
  async getById(@ParamId() id: string) {
    return this.tablesService.getById(id);
  }

  @Patch(':id')
  async update(@ParamId() id: string, data: UpdateTableDto) {
    return this.tablesService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.tablesService.delete(id);
  }
}
