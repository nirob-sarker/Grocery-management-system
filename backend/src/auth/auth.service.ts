import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { createHash, randomInt } from 'crypto';
import { UserRole } from '../common/enums/user-role.enum';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.createUser({
      email: dto.email.toLowerCase(),
      password: hashed,
      role: dto.role ?? UserRole.CUSTOMER,
      fullName: dto.fullName,
      phone: dto.phone,
      address: dto.address,
    });
    return { user };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email.toLowerCase());
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);

    const { password, ...safeUser } = user as any;
    return { accessToken, user: safeUser };
  }

  // OTP send
  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.toLowerCase();
    const user = await this.usersService.findByEmail(email);

    // do not leak user existence
    if (!user) return { message: 'If an account exists, an OTP has been sent.' };

    const otp = String(randomInt(100000, 1000000)); // 6-digit
    const otpHash = createHash('sha256').update(otp).digest('hex');

    const minutes = 10;
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);

    await this.usersService.setPasswordResetToken(email, otpHash, expiresAt);

    await this.mailService.sendPasswordReset(email, {
      name: user.fullName,
      otp,
      minutes,
    });

    return { message: 'If an account exists, an OTP has been sent.' };
  }

  // OTP verify + set new password
  async resetPassword(dto: ResetPasswordDto) {
    const email = dto.email.toLowerCase();
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Invalid OTP or email');

    const tokenHash = (user as any).passwordResetTokenHash as string | null | undefined;
    const expiresAt = (user as any).passwordResetTokenExpiresAt as Date | null | undefined;
    const attempts = ((user as any).passwordResetAttempts ?? 0) as number;

    if (!tokenHash || !expiresAt) throw new BadRequestException('Invalid or expired OTP');
    if (expiresAt.getTime() < Date.now()) throw new BadRequestException('OTP expired');
    if (attempts >= 5) throw new BadRequestException('Too many attempts. Please request a new OTP.');

    const incomingHash = createHash('sha256').update(dto.otp).digest('hex');
    if (incomingHash !== tokenHash) {
      await this.usersService.incrementPasswordResetAttempts(user.id);
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.usersService.updatePassword(user.id, hashed);
    await this.usersService.clearPasswordResetToken(user.id);

    return { message: 'Password reset successful' };
  }

  // Logged-in change password
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.usersService.findByIdWithPassword(userId);
    if (!user) throw new UnauthorizedException('Invalid user');

    const ok = await bcrypt.compare(dto.currentPassword, user.password);
    if (!ok) throw new BadRequestException('Current password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.usersService.updatePassword(userId, hashed);

    return { message: 'Password updated successfully' };
  }
}
