import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RestockDto {
  @ApiProperty({ example: 'UUID of product' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ required: false, example: 'UUID of supplier' })
  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @ApiProperty({ required: false, example: 'Restocked from local market' })
  @IsOptional()
  @IsString()
  note?: string;
}
