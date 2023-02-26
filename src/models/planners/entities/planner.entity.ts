import { Contract } from 'src/models/contracts/entities/contracts.entity';
import { Transaction } from 'src/models/transactions/entities/transactions.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Planner {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'NAME',
    nullable: false,
    length: 255,
  })
  public name: string;

  @Column({
    name: 'DESCRIPTION',
    nullable: false,
    length: 255,
  })
  public description: string;

  @OneToMany(() => Transaction, (transaction) => transaction.planner, {
    cascade: false,
  })
  public transactions: Transaction[];

  @OneToMany(() => Contract, (contract) => contract.planner, {
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
