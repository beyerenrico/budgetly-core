import { Category } from 'src/resources/categories/entities/categories.entity';
import { Contract } from 'src/resources/contracts/entities/contracts.entity';
import { Planner } from 'src/resources/planners/entities/planner.entity';
import { Transaction } from 'src/resources/transactions/entities/transactions.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: false,
  })
  public transactions: Transaction[];

  @OneToMany(() => Planner, (planner) => planner.user, {
    cascade: false,
  })
  public planners: Planner[];

  @OneToMany(() => Category, (category) => category.user, {
    cascade: false,
  })
  public categories: Category[];

  @OneToMany(() => Contract, (contract) => contract.user, {
    cascade: false,
  })
  public contracts: Contract[];

  @CreateDateColumn({
    name: 'CREATED_AT',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
