import { IsNumber, IsString } from 'class-validator';

export class UpdateMealDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category_id: string;
}
