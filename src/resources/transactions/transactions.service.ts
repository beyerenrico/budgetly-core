import { Logger, Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Transaction } from './entities/transactions.entity';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(TransactionsService.name);

  async findAll(): Promise<Transaction[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.transactionsRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
        },
        relations: {
          category: true,
          contract: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Transaction> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.transactionsRepository.findOneOrFail({
        where: { id },
        relations: {
          category: true,
          contract: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(transaction: Transaction): Promise<Transaction> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newTransaction = await this.transactionsRepository.create(
        transaction,
      );
      return await this.transactionsRepository.save(newTransaction);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, transaction: Transaction): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.transactionsRepository.findOneByOrFail({ id });
      return await this.transactionsRepository.update(id, transaction);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.transactionsRepository.findOneByOrFail({ id });
      return await this.transactionsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
