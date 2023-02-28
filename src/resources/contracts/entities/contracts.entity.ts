import { Planner } from 'src/resources/planners/entities/planner.entity';
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
export class Contract {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'TITLE',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public title: string;

  @ManyToOne(() => User, (user) => user.contracts, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;

  @ManyToOne(() => Planner, (planner) => planner.contracts, {
    cascade: true,
  })
  @JoinColumn({ name: 'PLANNER' })
  public planner: Planner;

  @OneToMany(() => Transaction, (transaction) => transaction.contract, {
    cascade: false,
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
