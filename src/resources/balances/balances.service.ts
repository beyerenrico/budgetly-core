import { Logger, Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Account } from '../accounts/entities/account.entity';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Balance } from './entities/balances.entity';

@Injectable({ scope: Scope.REQUEST })
export class BalancesService {
  constructor(
    @InjectRepository(Balance)
    private balancesRepository: Repository<Balance>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(BalancesService.name);

  async findAll(): Promise<Balance[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.balancesRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
        },
        relations: {
          account: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByAccount(accountId: Account['id']): Promise<Balance[]> {
    this.logger.log('START_SERVICE_METHOD: findAllByAccount');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.balancesRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
          account: {
            id: accountId,
          },
        },
        relations: {
          account: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Balance> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.balancesRepository.findOneOrFail({
        where: { id },
        relations: {
          account: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(balance: Balance): Promise<Balance> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newBalance = await this.balancesRepository.create(balance);
      return await this.balancesRepository.save(newBalance);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, balance: Balance): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.balancesRepository.findOneByOrFail({ id });
      return await this.balancesRepository.update(id, balance);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.balancesRepository.findOneByOrFail({ id });
      return await this.balancesRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeAllByAccount(accountId: Account['id']): Promise<void> {
    this.logger.log('START_SERVICE_METHOD: removeAllByAccount');

    try {
      const balances = await this.balancesRepository.find({
        where: {
          account: {
            id: accountId,
          },
        },
      });

      balances.forEach(async (balance) => {
        await this.balancesRepository.delete(balance.id);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
