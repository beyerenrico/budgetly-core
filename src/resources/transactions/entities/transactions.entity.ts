import { Card } from 'src/resources/cards/entities/card.entity';
import { Category } from 'src/resources/categories/entities/categories.entity';
import { Contract } from 'src/resources/contracts/entities/contracts.entity';
import { User } from 'src/resources/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'NAME',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public name: string;

  @Column({
    name: 'SENDER',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public sender: string;

  @Column({
    name: 'RECEIVER',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public receiver: string;

  @Column({
    name: 'AMOUNT',
    type: 'double',
    nullable: false,
  })
  public amount: number;

  @Column({
    name: 'DATE',
    type: 'timestamp',
    nullable: false,
  })
  public date: Date;

  @ManyToOne(() => Card, (card) => card.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'CARD' })
  public card?: Card;

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

  @ManyToOne(() => User, (user) => user.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

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
