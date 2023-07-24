import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  home_address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  work_address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  custom_address: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  date_of_birth: Date;
}
