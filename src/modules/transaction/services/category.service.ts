import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto, userId: string): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto, userId);
  }

  findByUserId(userId: string): Promise<Category[]> {
    return this.categoryRepository.findAll(userId);
  }

  findById(userId: string, categoryId: string): Promise<Category> {
    return this.categoryRepository.findById(userId, categoryId);
  }

  update(userId: string, categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.updateCategory(userId, categoryId, updateCategoryDto);
  }

  remove(userId: string, categoryId: string): Promise<void> {
    return this.categoryRepository.removeCategory(userId, categoryId);
  }
}
