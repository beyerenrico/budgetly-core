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

import { AccountsService } from './accounts.service';

import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  private readonly logger = new Logger(AccountsController.name);

  @Get()
  async findAll(): Promise<Account[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.accountsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.accountsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() account: Account) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.accountsService.create(account);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() account: Account) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.accountsService.update(id, account);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.accountsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
