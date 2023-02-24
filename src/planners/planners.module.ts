import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlannersController } from './planners.controller';
import { PlannersService } from './planners.service';

import { Planner } from './entities/planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planner])],
  controllers: [PlannersController],
  providers: [PlannersService],
  exports: [PlannersService],
})
export class PlannersModule {}
