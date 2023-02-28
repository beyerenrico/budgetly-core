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
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'NAME',
    nullable: false,
    length: 255,
  })
  public name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {
    onDelete: 'SET NULL',
  })
  public transactions: Transaction[];

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
