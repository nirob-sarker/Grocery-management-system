import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fruits' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ required: false, example: 'All kinds of fruits' })
  @IsOptional()
  @IsString()
  description?: string;
}
