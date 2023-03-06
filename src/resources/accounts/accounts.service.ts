import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Account } from './entities/account.entity';

@Injectable({ scope: Scope.REQUEST })
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(AccountsService.name);

  async findAll(): Promise<Account[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.accountsRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
        },
        relations: {
          transactions: true,
          balances: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Account> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.accountsRepository.findOneOrFail({
        where: { id },
        relations: {
          transactions: true,
          balances: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(account: Account) {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newAccount = await this.accountsRepository.create(account);
      return await this.accountsRepository.save(newAccount);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, account: Account): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.accountsRepository.findOneByOrFail({ id });
      return await this.accountsRepository.update(id, account);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.accountsRepository.findOneByOrFail({ id });
      return await this.accountsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
