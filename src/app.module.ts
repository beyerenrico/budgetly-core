import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PlannersController } from './planners/planners.controller';
import { PlannersModule } from './planners/planners.module';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsModule } from './transactions/transactions.module';
import dbConfig from './db/config/ormconfig';

@Module({
  imports: [dbConfig, PlannersModule, TransactionsModule],
  controllers: [AppController, PlannersController, TransactionsController],
  providers: [AppService],
})
export class AppModule {}
