import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { CategoriesService } from "./categories.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/app/user/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller("categories")
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) {} 

    @Post()
    async create(@Body() data: CreateCategoryDto) {
        return this.categoriesService.create(data)
    }

    @Get(":id")
    async getById(@ParamId() id: string) {
        return this.categoriesService.getById(id);
    }

    @Get()
    async list() {
        return this.categoriesService.list();
    }

    @Patch(":id")
    async update(@ParamId() id: string, data: UpdateCategoryDto) {
        return this.categoriesService.update(id, data);
    }

    @Delete()
    async delete(@ParamId() id: string) {
        return this.categoriesService.delete(id);
    }
}