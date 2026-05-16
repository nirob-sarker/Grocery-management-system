import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { Product } from '../database/entities/product.entity';
import { Supplier } from '../database/entities/supplier.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Supplier) private readonly supplierRepo: Repository<Supplier>,
  ) {}

  async create(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new BadRequestException('Invalid categoryId');

    let supplier: Supplier | null = null;
    if (dto.supplierId) {
      supplier = await this.supplierRepo.findOne({ where: { id: dto.supplierId } });
      if (!supplier) throw new BadRequestException('Invalid supplierId');
    }

    try {
      const product = this.productRepo.create({
        sku: dto.sku.trim(),
        name: dto.name.trim(),
        price: String(dto.price),
        description: dto.description?.trim(),
        stockQty: dto.stockQty,
        reorderLevel: dto.reorderLevel ?? 5,
        category,
        supplier: supplier ?? null,
      });

      return await this.productRepo.save(product);
    } catch (e: any) {
      if (e?.code === '23505') throw new ConflictException('SKU already exists');
      throw e;
    }
  }

  async findAll() {
    // category & supplier eager=true => auto included
    return this.productRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
