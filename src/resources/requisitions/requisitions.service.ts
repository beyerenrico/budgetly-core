import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Requisition } from './entities/requisition.entity';

@Injectable({ scope: Scope.REQUEST })
export class RequisitionsService {
  constructor(
    @InjectRepository(Requisition)
    private requisitionsRepository: Repository<Requisition>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(RequisitionsService.name);

  async findAll(): Promise<Requisition[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.requisitionsRepository.find({
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

  async findOne(id: string): Promise<Requisition> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.requisitionsRepository.findOneOrFail({
        where: { id },
        relations: {
          user: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(requisition: Requisition) {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newRequisition = await this.requisitionsRepository.create(
        requisition,
      );
      return await this.requisitionsRepository.save(newRequisition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, requisition: Requisition): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.requisitionsRepository.findOneByOrFail({ id });
      return await this.requisitionsRepository.update(id, requisition);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.requisitionsRepository.findOneByOrFail({ id });
      return await this.requisitionsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
