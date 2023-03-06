import { Balance } from 'src/resources/balances/entities/balances.entity';
import { Requisition } from 'src/resources/requisitions/entities/requisition.entity';
import { Transaction } from 'src/resources/transactions/entities/transactions.entity';
import { User } from 'src/resources/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'IBAN',
    nullable: false,
    length: 255,
  })
  public iban: string;

  @Column({
    name: 'INSTITUTION',
    nullable: false,
    length: 255,
  })
  public institution: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    cascade: false,
  })
  public transactions: Transaction[];

  @OneToMany(() => Balance, (balance) => balance.account, {
    cascade: false,
  })
  public balances?: Balance[];

  @ManyToOne(() => User, (user) => user.accounts, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

  @ManyToOne(() => Requisition, (requisition) => requisition.accounts, {
    cascade: true,
  })
  @JoinColumn({ name: 'REQUISITION' })
  public requisition: Requisition;

  @CreateDateColumn({
    name: 'CREATED_AT',
    nullable: false,
    type: 'timestamp',
  })
  public createdAt: Date;
}
