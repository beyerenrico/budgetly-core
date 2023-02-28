import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ormConfig } from './db/config/ormconfig';
import { CardsModule } from './models/cards/cards.module';
import { CategoriesController } from './models/categories/categories.controller';
import { CategoriesModule } from './models/categories/categories.module';
import { ContractsController } from './models/contracts/contracts.controller';
import { ContractsModule } from './models/contracts/contracts.module';
import { IamModule } from './models/iam/iam.module';
import { PlannersController } from './models/planners/planners.controller';
import { PlannersModule } from './models/planners/planners.module';
import { TransactionsController } from './models/transactions/transactions.controller';
import { TransactionsModule } from './models/transactions/transactions.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    PlannersModule,
    TransactionsModule,
    CategoriesModule,
    ContractsModule,
    CardsModule,
    UsersModule,
    IamModule,
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
