import { Account } from 'src/resources/accounts/entities/account.entity';
import { Category } from 'src/resources/categories/entities/categories.entity';
import { Contract } from 'src/resources/contracts/entities/contracts.entity';
import { User } from 'src/resources/users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'TRANSACTION_ID',
    type: 'varchar',
    nullable: false,
    length: 255,
    unique: true,
  })
  public transactionId: string;

  @Column({
    name: 'STATUS',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public status: 'booked' | 'pending';

  @Column({
    name: 'BANK_TRANSACTION_CODE',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public bankTransactionCode: string;

  @Column({
    name: 'BOOKING_DATE',
    type: 'timestamp',
    nullable: false,
  })
  public bookingDate: Date;

  @Column({
    name: 'VALUE_DATE',
    type: 'timestamp',
    nullable: false,
  })
  public valueDate: Date;

  @Column({
    name: 'CREDITOR_ACCOUNT_IBAN',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public creditorAccountIban: string;

  @Column({
    name: 'CREDITOR_ACCOUNT_CURRENCY',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  public creditorAccountCurrency?: string;

  @Column({
    name: 'DEBTOR_ACCOUNT_IBAN',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public debtorAccountIban: string;

  @Column({
    name: 'DEBTOR_ACCOUNT_NAME',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  public debtorAccountName?: string;

  @Column({
    name: 'REMITTANCE_INFORMATION_UNSTRUCTURED',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public remittanceInformationUnstructured: string;

  @Column({
    name: 'TRANSACTION_AMOUNT',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public transactionAmount: string;

  @Column({
    name: 'TRANSACTION_CURRENCY',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public transactionCurrency: string;

  @ManyToOne(() => User, (user) => user.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

  @ManyToOne(() => Account, (account) => account.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'ACCOUNT' })
  public account: Account;

  @ManyToOne(() => Category, (category) => category.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'CATEGORY' })
  public category?: Category;

  @ManyToOne(() => Contract, (contract) => contract.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'CONTRACT' })
  public contract?: Contract;
}
