import { IsEnum } from "class-validator";
import { Role } from "src/app/user/enums/role.enum";

export class AuthPayloadDto {
    id: string;

    @IsEnum(Role)
    role?: number;
}