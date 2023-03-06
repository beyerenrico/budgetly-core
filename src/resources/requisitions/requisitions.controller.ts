import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Logger,
  Put,
} from '@nestjs/common';

import { RequisitionsService } from './requisitions.service';

import { Requisition } from './entities/requisition.entity';

@Controller('requisitions')
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) {}

  private readonly logger = new Logger(RequisitionsController.name);

  @Get()
  async findAll(): Promise<Requisition[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.requisitionsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Requisition> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.requisitionsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() requisition: Requisition) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.requisitionsService.create(requisition);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() requisition: Requisition) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.requisitionsService.update(id, requisition);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.requisitionsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
