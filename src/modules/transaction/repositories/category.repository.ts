import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async createCategory(createCategoryDto: CreateCategoryDto, userId: string): Promise<Category> {
    const { label, description } = createCategoryDto;
    const category = new Category();

    category.label = label;
    category.description = description;
    category.owner_id = userId;

    return await this.save(category);
  }

  public async findAll(userId: string): Promise<Category[]> {
    return await this.find({ owner_id: userId });
  }

  public async findById(userId: string, categoryId: string): Promise<Category> {
    return await this.findOne({ id: categoryId, owner_id: userId });
  }

  public async updateCategory(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { label, description } = updateCategoryDto;
    const category = await this.findOne({ id: categoryId, owner_id: userId });

    category.label = label || category.label;
    category.description = description || category.description;

    return await this.save(category);
  }

  public async removeCategory(userId: string, categoryId: string): Promise<void> {
    const category = await this.find({ id: categoryId, owner_id: userId });
    await this.remove(category);
  }
}
