import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'customer1@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456', description: 'OTP code from email' })
  @IsString()
  otp!: string;

  @ApiProperty({ example: 'NewStrongPass123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword!: string;
}
