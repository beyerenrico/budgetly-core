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

import { ReportsService } from './reports.service';

import { Report } from './entities/reports.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  private readonly logger = new Logger(ReportsController.name);

  @Get()
  async findAll(): Promise<Report[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.reportsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Report> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.reportsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() report: Report) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.reportsService.create(report);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() report: Report) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.reportsService.update(id, report);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.reportsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
