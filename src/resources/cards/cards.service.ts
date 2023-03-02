import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Card } from './entities/card.entity';

@Injectable({ scope: Scope.REQUEST })
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(CardsService.name);

  async findAll(): Promise<Card[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.cardsRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
        },
        relations: {
          transactions: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Card> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.cardsRepository.findOneOrFail({
        where: { id },
        relations: {
          transactions: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(card: Card) {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newCard = await this.cardsRepository.create(card);
      return await this.cardsRepository.save(newCard);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, card: Card): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.cardsRepository.findOneByOrFail({ id });
      return await this.cardsRepository.update(id, card);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.cardsRepository.findOneByOrFail({ id });
      return await this.cardsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
