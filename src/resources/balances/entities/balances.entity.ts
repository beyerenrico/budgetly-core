import { Account } from 'src/resources/accounts/entities/account.entity';
import { User } from 'src/resources/users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'BALANCE_AMOUNT',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public balanceAmount: string;

  @Column({
    name: 'BALANCE_CURRENCY',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public balanceCurrency: string;

  @Column({
    name: 'BALANCE_TYPE',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public balanceType: string;

  @Column({
    name: 'CREDIT_LIMIT_INCLUDED',
    type: 'boolean',
  })
  public creditLimitIncluded: boolean;

  @ManyToOne(() => User, (user) => user.balances, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

  @ManyToOne(() => Account, (account) => account.balances, {
    cascade: true,
  })
  @JoinColumn({ name: 'ACCOUNT' })
  public account: Account;
}
