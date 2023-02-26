import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Patch,
  Logger,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { Category } from './entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private readonly logger = new Logger(CategoriesController.name);

  @Get()
  async findAll(): Promise<Category[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.categoriesService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.categoriesService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() category: Category) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.categoriesService.create(category);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() category: Category) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.categoriesService.update(id, category);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.categoriesService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
