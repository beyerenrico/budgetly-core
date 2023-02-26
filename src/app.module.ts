import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './db/config/ormconfig';
import { PlannersController } from './entities/planners/planners.controller';
import { PlannersModule } from './entities/planners/planners.module';
import { TransactionsController } from './entities/transactions/transactions.controller';
import { TransactionsModule } from './entities/transactions/transactions.module';

@Module({
  imports: [dbConfig, PlannersModule, TransactionsModule],
  controllers: [AppController, PlannersController, TransactionsController],
  providers: [AppService],
})
export class AppModule {}
