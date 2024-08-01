import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/app/enums/role.enum";

export class CreateUserDto {

    @IsString()
    id?: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: number
}