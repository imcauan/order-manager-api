import { IsNumber, IsString } from "class-validator";

export class CreateMealDto {
    @IsString()
    name: string;

    image: Express.Multer.File;

    @IsNumber()
    price: number;

    @IsString()
    category_id: string;
}