import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserRole } from '../common/enums/user-role.enum';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepo: Repository<User>) {}

  async findAll() {
    return this.usersRepo.find({ order: { email: 'ASC' } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Needed for change-password (password is select:false)
  async findByIdWithPassword(id: string): Promise<User | null> {
    return this.usersRepo
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .addSelect('u.password')
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepo
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .addSelect('u.password')
      .getOne();
  }

  async findEmailsByRoles(roles: UserRole[]): Promise<string[]> {
    const users = await this.usersRepo.find({
      where: { role: In(roles) },
      select: ['email'],
    });
    return users.map((u) => u.email);
  }

  async createUser(data: {
    email: string;
    password: string;
    role: UserRole;
    fullName: string;
    phone?: string;
    address?: string;
  }): Promise<User> {
    try {
      const user = this.usersRepo.create(data);
      return await this.usersRepo.save(user);
    } catch (e: any) {
      if (e?.code === '23505') throw new ConflictException('Email already exists');
      throw e;
    }
  }

  async updateUser(
    id: string,
    patch: Partial<Pick<User, 'role' | 'fullName' | 'phone' | 'address'>>,
  ) {
    await this.findById(id);
    await this.usersRepo.update({ id }, patch);
    return this.findById(id);
  }

  async deleteUser(id: string) {
    await this.findById(id);
    return this.usersRepo.delete({ id });
  }

  // OTP reset helpers (reuse existing columns)
  async setPasswordResetToken(email: string, tokenHash: string, expiresAt: Date) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    await this.usersRepo.update(
      { id: user.id },
      {
        passwordResetTokenHash: tokenHash,
        passwordResetTokenExpiresAt: expiresAt,
        passwordResetAttempts: 0,
        passwordResetLastSentAt: new Date(),
      } as any,
    );
    return true;
  }

  async incrementPasswordResetAttempts(userId: string) {
    const user = await this.findById(userId);
    const current = (user as any).passwordResetAttempts ?? 0;
    await this.usersRepo.update({ id: userId }, { passwordResetAttempts: current + 1 } as any);
  }

  async clearPasswordResetToken(userId: string) {
    await this.usersRepo.update(
      { id: userId },
      {
        passwordResetTokenHash: null,
        passwordResetTokenExpiresAt: null,
        passwordResetAttempts: 0,
      } as any,
    );
  }

  async updatePassword(userId: string, hashedPassword: string) {
    await this.usersRepo.update({ id: userId }, { password: hashedPassword });
  }
}
