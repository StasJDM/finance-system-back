import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    const userId: string = req.user.id;
    return this.categoryService.create(createCategoryDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId: string = req.user.id;
    return this.categoryService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId: string = req.user.id;
    return this.categoryService.findById(userId, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateCategoryDto: UpdateCategoryDto) {
    const userId: string = req.user.id;
    return this.categoryService.update(userId, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId: string = req.user.id;
    return this.categoryService.remove(userId, id);
  }
}
