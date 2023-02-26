import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './db/config/ormconfig';
import { CategoriesController } from './models/categories/categories.controller';
import { CategoriesModule } from './models/categories/categories.module';
import { PlannersController } from './models/planners/planners.controller';
import { PlannersModule } from './models/planners/planners.module';
import { TransactionsController } from './models/transactions/transactions.controller';
import { TransactionsModule } from './models/transactions/transactions.module';

@Module({
  imports: [dbConfig, PlannersModule, TransactionsModule, CategoriesModule],
  controllers: [
    AppController,
    PlannersController,
    TransactionsController,
    CategoriesController,
  ],
  providers: [AppService],
})
export class AppModule {}
