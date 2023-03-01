import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ormConfig } from './db/config/ormconfig';
import { CardsModule } from './resources/cards/cards.module';
import { CategoriesController } from './resources/categories/categories.controller';
import { CategoriesModule } from './resources/categories/categories.module';
import { ContractsController } from './resources/contracts/contracts.controller';
import { ContractsModule } from './resources/contracts/contracts.module';
import { IamModule } from './resources/iam/iam.module';
import { ReportsController } from './resources/reports/reports.controller';
import { ReportsModule } from './resources/reports/reports.module';
import { TransactionsController } from './resources/transactions/transactions.controller';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    ReportsModule,
    TransactionsModule,
    CategoriesModule,
    ContractsModule,
    CardsModule,
    UsersModule,
    IamModule,
  ],
  controllers: [
    AppController,
    ReportsController,
    TransactionsController,
    CategoriesController,
    ContractsController,
  ],
  providers: [AppService],
})
export class AppModule {}
