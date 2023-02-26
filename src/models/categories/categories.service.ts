import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Category } from './entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private readonly logger = new Logger(CategoriesService.name);

  async findAll(): Promise<Category[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Category> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.categoriesRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(category: Category): Promise<Category> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newCategory = await this.categoriesRepository.create(category);
      return await this.categoriesRepository.save(newCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, category: Category): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.categoriesRepository.findOneByOrFail({ id });
      return await this.categoriesRepository.update(id, category);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.categoriesRepository.findOneByOrFail({ id });
      return await this.categoriesRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
