import { IsArray, IsEnum, IsString } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { Meals } from "@prisma/client";

export class CreateOrderDto {
    @IsEnum(OrderStatus)
    status: number;

    @IsString()
    user_id: string;

    @IsString()
    table_id: string;

    meals: Meals[]
}