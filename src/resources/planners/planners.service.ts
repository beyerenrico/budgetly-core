import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Planner } from './entities/planner.entity';

@Injectable()
export class PlannersService {
  constructor(
    @InjectRepository(Planner)
    private plannersRepository: Repository<Planner>,
  ) {}

  private readonly logger = new Logger(PlannersService.name);

  async findAll(): Promise<Planner[]> {
    this.logger.log('START_SERVICE_METHOD: findAll');

    try {
      return await this.plannersRepository.find();
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
