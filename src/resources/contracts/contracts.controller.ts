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

import { ContractsService } from './contracts.service';

import { Contract } from './entities/contracts.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  private readonly logger = new Logger(ContractsController.name);

  @Get()
  async findAll(): Promise<Contract[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.contractsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/planner/:plannerId')
  async findAllByPlanner(
    @Param('plannerId') plannerId: string,
  ): Promise<Contract[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.contractsService.findAll(plannerId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contract> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.contractsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() contract: Contract) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.contractsService.create(contract);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() contract: Contract) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.contractsService.update(id, contract);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.contractsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
