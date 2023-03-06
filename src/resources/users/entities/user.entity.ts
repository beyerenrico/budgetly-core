import { Account } from 'src/resources/accounts/entities/account.entity';
import { Balance } from 'src/resources/balances/entities/balances.entity';
import { Category } from 'src/resources/categories/entities/categories.entity';
import { Contract } from 'src/resources/contracts/entities/contracts.entity';
import { Report } from 'src/resources/reports/entities/reports.entity';
import { Requisition } from 'src/resources/requisitions/entities/requisition.entity';
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
  public transactions?: Transaction[];

  @OneToMany(() => Requisition, (requisition) => requisition.user, {
    cascade: false,
  })
  public requisitions?: Requisition[];

  @OneToMany(() => Account, (account) => account.user, {
    cascade: false,
  })
  public accounts?: Account[];

  @OneToMany(() => Balance, (balance) => balance.user, {
    cascade: false,
  })
  public balances?: Balance[];

  @OneToMany(() => Report, (report) => report.user, {
    cascade: false,
  })
  public reports?: Report[];

  @OneToMany(() => Category, (category) => category.user, {
    cascade: false,
  })
  public categories?: Category[];

  @OneToMany(() => Contract, (contract) => contract.user, {
    cascade: false,
  })
  public contracts?: Contract[];

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
