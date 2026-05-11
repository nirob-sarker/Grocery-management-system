import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../database/entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto) {
    const supplier = this.supplierRepo.create({
      name: dto.name.trim(),
      contactPerson: dto.contactPerson?.trim(),
      email: dto.email?.toLowerCase(),
      phone: dto.phone?.trim(),
      categoriesSupplied: dto.categoriesSupplied?.map((x) => x.trim()),
    });
    return this.supplierRepo.save(supplier);
  }

  async findAll() {
    return this.supplierRepo.find({ order: { name: 'ASC' } });
  }

  async findById(id: string) {
    const supplier = await this.supplierRepo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }
}
