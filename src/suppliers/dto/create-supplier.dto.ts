import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Fresh Supply Ltd.' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ required: false, example: 'Mr. Rahim' })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ required: false, example: 'supplier@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: '01711111111' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: ['Fruits', 'Vegetables'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoriesSupplied?: string[];
}
