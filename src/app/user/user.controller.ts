import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
''
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

    @Get(":id")
    async readOne(@ParamId() id: string) {
        return this.userService.getById(id)
    }

    @Patch(":id")
    async update(@Body() data: UpdateUserDto, @ParamId() id: string) {
        return this.userService.update(id, data)
    }

    @Delete(":id")
    async delete(@ParamId() id: string) {
        return this.userService.delete(id)
    }
}