import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Logger,
  Put,
} from '@nestjs/common';

import { CardsService } from './cards.service';

import { Card } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  private readonly logger = new Logger(CardsController.name);

  @Get()
  async findAll(): Promise<Card[]> {
    this.logger.log('START_CONTROLLER_METHOD: findAll');

    try {
      return await this.cardsService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    this.logger.log('START_CONTROLLER_METHOD: findOne');

    try {
      return this.cardsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(@Body() card: Card) {
    this.logger.log('START_CONTROLLER_METHOD: create');

    try {
      return await this.cardsService.create(card);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() card: Card) {
    this.logger.log('START_CONTROLLER_METHOD: update');

    try {
      return await this.cardsService.update(id, card);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('START_CONTROLLER_METHOD: remove');

    try {
      return await this.cardsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
