import { Contract } from 'src/resources/contracts/entities/contracts.entity';
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

  @ManyToOne(() => User, (user) => user.planners, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

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
