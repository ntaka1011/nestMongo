import { PostRepository } from './../repository/post.repository';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async getAll() {
    return this.categoryRepository.getByCondition({});
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  async getByCategories(categories_ids: any) {
    return this.postRepository.getByCondition({
      categories: { $all: categories_ids },
    });
  }
}
