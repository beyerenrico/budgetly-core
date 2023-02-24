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

import { PlannersService } from './planners.service';

import { Planner } from './entities/planner.entity';

@Controller('planners')
export class PlannersController {
  constructor(private readonly plannersService: PlannersService) {}

  private readonly logger = new Logger(PlannersController.name);

  @Get()
  async findAll(): Promise<Planner[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.plannersService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Planner> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.plannersService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() planner: Planner) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.plannersService.create(planner);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() planner: Planner) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.plannersService.update(id, planner);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.plannersService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
