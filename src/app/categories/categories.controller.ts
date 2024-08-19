import { Body, Controller, Delete, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { CategoriesService } from "./categories.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { UpdateCategoryDto } from "./dtos/update-category.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/app/user/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller("categories")
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) {} 

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
    @Post()
    async create(@UploadedFile() image: Express.Multer.File, @Body() data: CreateCategoryDto) {
        return this.categoriesService.create(image, data)
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

    @Delete("/:id")
    async delete(@ParamId() id: string) {
        return this.categoriesService.delete(id);
    }
}