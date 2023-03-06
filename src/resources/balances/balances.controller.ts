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

import { Account } from '../accounts/entities/account.entity';

import { BalancesService } from './balances.service';

import { Balance } from './entities/balances.entity';

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  private readonly logger = new Logger(BalancesController.name);

  @Get()
  async findAll(): Promise<Balance[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.balancesService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('account/:id')
  async findAllByAccount(@Param(':id') accountId: string): Promise<Balance[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.balancesService.findAllByAccount(accountId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Balance> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.balancesService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() balance: Balance) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.balancesService.create(balance);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() balance: Balance) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.balancesService.update(id, balance);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.balancesService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('/account/:accountId')
  async removeAllByAccount(@Param('accountId') accountId: Account['id']) {
    this.logger.log('START_CONTROLLER_METHOD: removeAllByAccount');

    try {
      return await this.balancesService.removeAllByAccount(accountId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
