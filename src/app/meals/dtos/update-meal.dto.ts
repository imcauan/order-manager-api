import { IsNumber, IsString } from "class-validator";
import { CreateMealDto } from "./create-meal.dto";

export class UpdateMealDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    category_id: string;
}