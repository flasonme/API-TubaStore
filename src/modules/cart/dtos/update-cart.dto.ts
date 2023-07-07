import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @IsString()
  @IsNotEmpty()
  user_id?: string;
  @IsString()
  @IsNotEmpty()
  product_id?: string;
  @IsString()
  @IsNotEmpty()
  variant_id?: string;
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
}
