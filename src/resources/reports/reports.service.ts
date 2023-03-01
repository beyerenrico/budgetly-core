import { Logger, Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Request } from 'express';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';

import { Report } from './entities/reports.entity';

@Injectable({ scope: Scope.REQUEST })
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  private readonly logger = new Logger(ReportsService.name);

  async findAll(): Promise<Report[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    const activeUser = this.request.user as ActiveUserData;

    try {
      return await this.reportsRepository.find({
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

  async findOne(id: string): Promise<Report> {
    this.logger.log('START_SERVICE_METHOD: findOne');

    try {
      return await this.reportsRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(report: Report): Promise<Report> {
    this.logger.log('START_SERVICE_METHOD: create');

    try {
      const newReport = await this.reportsRepository.create(report);
      return await this.reportsRepository.save(newReport);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, report: Report): Promise<UpdateResult> {
    this.logger.log('START_SERVICE_METHOD: update');

    try {
      await this.reportsRepository.findOneByOrFail({ id });
      return await this.reportsRepository.update(id, report);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    this.logger.log('START_SERVICE_METHOD: remove');

    try {
      await this.reportsRepository.findOneByOrFail({ id });
      return await this.reportsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
