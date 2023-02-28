import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ormConfig } from './db/config/ormconfig';
import { CardsController } from './resources/cards/cards.controller';
import { CardsModule } from './resources/cards/cards.module';
import { CardsService } from './resources/cards/cards.service';
import { CategoriesController } from './resources/categories/categories.controller';
import { CategoriesModule } from './resources/categories/categories.module';
import { CategoriesService } from './resources/categories/categories.service';
import { ContractsController } from './resources/contracts/contracts.controller';
import { ContractsModule } from './resources/contracts/contracts.module';
import { ContractsService } from './resources/contracts/contracts.service';
import { IamModule } from './resources/iam/iam.module';
import { PlannersController } from './resources/planners/planners.controller';
import { PlannersModule } from './resources/planners/planners.module';
import { PlannersService } from './resources/planners/planners.service';
import { TransactionsController } from './resources/transactions/transactions.controller';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { TransactionsService } from './resources/transactions/transactions.service';
import { UsersController } from './resources/users/users.controller';
import { UsersModule } from './resources/users/users.module';
import { UsersService } from './resources/users/users.service';
import { AuthenticationController } from './resources/iam/authentication/authentication.controller';
import { AuthenticationService } from './resources/iam/authentication/authentication.service';
import { BcryptService } from './resources/iam/hashing/bcrypt.service';
import { HashingService } from './resources/iam/hashing/hashing.service';

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
