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

import { FindOptionsWhere } from 'typeorm';

import { TransactionsService } from './transactions.service';

import { Transaction } from './entities/transactions.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  private readonly logger = new Logger(TransactionsController.name);

  @Get()
  async findAll(
    @Body() where: FindOptionsWhere<Transaction>,
  ): Promise<Transaction[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.transactionsService.findAll(where);
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
  async create(@Body() transaction: Transaction) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.transactionsService.create(transaction);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() transaction: Transaction) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.transactionsService.update(id, transaction);
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
