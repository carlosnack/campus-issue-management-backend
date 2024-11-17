import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(createdCategory);
  }

  async findAll(): Promise<Category[] | undefined> {
    return this.categoryRepository.findBy({});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    const updatedCategory = this.categoryRepository.update({ id }, updateCategoryDto);
    return updatedCategory;
  }

  remove(id: number): Promise<DeleteResult> {
    const removedCategory = this.categoryRepository.delete({ id });
    return removedCategory;
  }
}
