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

import { TransactionsService } from './transactions.service';

import { Transaction } from './entities/transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  private readonly logger = new Logger(TransactionsController.name);

  @Get()
  async findAll(): Promise<Transaction[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.transactionsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Transaction> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.transactionsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() planner: Transaction) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.transactionsService.create(planner);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() planner: Transaction) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.transactionsService.update(id, planner);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.transactionsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
