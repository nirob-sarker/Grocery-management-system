import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'SKU-APPLE-001' })
  @IsString()
  @MinLength(2)
  sku: string;

  @ApiProperty({ example: 'Apple' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 120.5, description: 'Unit price' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ required: false, example: 'Fresh red apples' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stockQty: number;

  @ApiProperty({ required: false, example: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reorderLevel?: number;

  @ApiProperty({ example: 'UUID of category' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ required: false, example: 'UUID of supplier' })
  @IsOptional()
  @IsUUID()
  supplierId?: string;
}
