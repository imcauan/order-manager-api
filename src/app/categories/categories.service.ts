import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/prisma/prisma.service";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UpdateCategoryDto } from "./dtos/update-category.dto";

@Injectable()
export class CategoriesService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async create(image: Express.Multer.File, data: CreateCategoryDto) {
        const findByName = await this.prismaService.categories.findFirst({ where: { name: data.name }});

        if(findByName) {
            throw new ConflictException("A category with this name already exists!");
        }

        try {
            const category = await this.prismaService.categories.create({
                data: {
                    name: data.name,
                    image: image.filename
                }
            });

            return { 
                success: true,
                category_id: category.id
            }
        } catch (error) {
            throw new BadRequestException(error);
        }

    }

    async getById(id: string) {
        try {
          const category = await this.prismaService.categories.findUnique({ where: { id }, include: { meals: true }});
  
          if(!category) {
              throw new NotFoundException("Category not found.");
          }
          
          return category;
        } catch (error) {
          throw new BadRequestException(error);
        }
    }

    async list() {
        return this.prismaService.categories.findMany();
    }

    async update(id: string, data: UpdateCategoryDto) {
        const category = await this.prismaService.categories.findUnique({ where: { id }});

        if(!category) {
            throw new NotFoundException("Category not found.");
        }

        try {
            await this.prismaService.categories.update({
                where: {
                    id: category.id
                },
                data
            });

            return category
        } catch (error) {
          throw new BadRequestException(error);
        }
    }

    async delete(id: string) {
        const category = await this.prismaService.categories.findUnique({ where: { id }});

        if(!category) {
            throw new NotFoundException("Category not found.");
        }

        try {
            await this.prismaService.categories.delete({where: { id: category.id }});
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}