import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Contract } from './entities/contracts.entity';

@Injectable({ scope: Scope.REQUEST })
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(ContractsService.name);

  async findAll(plannerId?: string): Promise<Contract[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.contractsRepository.find({
        where: {
          planner: {
            id: plannerId,
          },
          user: {
            id: activeUser.sub,
          },
        },
        relations: {
          planner: true,
          transactions: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Contract> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.contractsRepository.findOneOrFail({
        where: { id },
        relations: {
          planner: true,
          transactions: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(contract: Contract): Promise<Contract> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newContract = await this.contractsRepository.create(contract);
      return await this.contractsRepository.save(newContract);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, contract: Contract): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.contractsRepository.findOneByOrFail({ id });
      return await this.contractsRepository.update(id, contract);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.contractsRepository.findOneByOrFail({ id });
      return await this.contractsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
