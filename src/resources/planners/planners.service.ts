import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Planner } from './entities/planner.entity';

@Injectable({ scope: Scope.REQUEST })
export class PlannersService {
  constructor(
    @InjectRepository(Planner)
    private plannersRepository: Repository<Planner>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(PlannersService.name);

  async findAll(): Promise<Planner[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.plannersRepository.find({
        where: {
          user: {
            id: activeUser.sub,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Planner> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.plannersRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(planner: Planner): Promise<Planner> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newPlanner = await this.plannersRepository.create(planner);
      return await this.plannersRepository.save(newPlanner);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, planner: Planner): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.plannersRepository.findOneByOrFail({ id });
      return await this.plannersRepository.update(id, planner);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.plannersRepository.findOneByOrFail({ id });
      return await this.plannersRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
