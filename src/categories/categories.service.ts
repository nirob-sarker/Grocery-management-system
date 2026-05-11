import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    try {
      const category = this.categoryRepo.create({
        name: dto.name.trim(),
        description: dto.description?.trim(),
      });
      return await this.categoryRepo.save(category);
    } catch (e: any) {
      if (e?.code === '23505') throw new ConflictException('Category name already exists');
      throw e;
    }
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async findAll() {
    return this.categoryRepo.find({ order: { name: 'ASC' } });
  }
}
