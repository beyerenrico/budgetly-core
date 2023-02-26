import { Planner } from 'src/planners/entities/planner.entity';

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
    name: 'TITLE',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  public title: string;

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

  @ManyToOne(() => Planner, (planner) => planner.transactions, {
    cascade: true,
  })
  @JoinColumn({ name: 'PLANNER' })
  public planner: Planner;

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
