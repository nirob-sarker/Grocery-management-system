import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserRole } from '../common/enums/user-role.enum';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  // Needed for login because password has select:false
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
    password: string; // hashed
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
}
