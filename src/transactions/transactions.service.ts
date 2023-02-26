import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Transaction } from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  private readonly logger = new Logger(TransactionsService.name);

  async findAll(): Promise<Transaction[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    try {
      return await this.transactionsRepository.find({
        relations: {
          planner: true,
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
          planner: true,
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
