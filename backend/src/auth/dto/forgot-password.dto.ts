import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'customer1@gmail.com' })
  @IsEmail()
  email!: string;
}
