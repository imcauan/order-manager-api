import { IsDecimal, IsEnum, IsString } from 'class-validator';
import { Meals } from '@prisma/client';

export class CreateOrderDto {
  @IsString()
  author_name: string;

  @IsString()
  user_id: string;

  @IsString()
  table_id: string;

  meals: Meals[];

  total: number;
}
