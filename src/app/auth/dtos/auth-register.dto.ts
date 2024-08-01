import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";
import { Role } from "src/app/enums/role.enum";

export class AuthRegisterDto extends AuthLoginDto {
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: number
}