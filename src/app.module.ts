import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './db/config/ormconfig';
import { CategoriesController } from './models/categories/categories.controller';
import { CategoriesModule } from './models/categories/categories.module';
import { ContractsController } from './models/contracts/contracts.controller';
import { ContractsModule } from './models/contracts/contracts.module';
import { PlannersController } from './models/planners/planners.controller';
import { PlannersModule } from './models/planners/planners.module';
import { TransactionsController } from './models/transactions/transactions.controller';
import { TransactionsModule } from './models/transactions/transactions.module';

@Module({
  imports: [
    dbConfig,
    PlannersModule,
    TransactionsModule,
    CategoriesModule,
    ContractsModule,
  ],
  controllers: [
    AppController,
    PlannersController,
    TransactionsController,
    CategoriesController,
    ContractsController,
  ],
  providers: [AppService],
})
export class AppModule {}
