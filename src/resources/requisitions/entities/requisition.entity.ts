import { Account } from 'src/resources/accounts/entities/account.entity';
import { User } from 'src/resources/users/entities/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Requisition {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  public id: string;

  @Column({
    name: 'REQUISITION',
    nullable: false,
    length: 255,
  })
  public requisition: string;

  @Column({
    name: 'INSTITUTION',
    nullable: false,
    length: 255,
  })
  public institution: string;

  @Column({
    name: 'LINK',
    nullable: false,
    length: 255,
  })
  public link: string;

  @OneToMany(() => Account, (account) => account.requisition, {
    cascade: false,
  })
  public accounts?: Account[];

  @ManyToOne(() => User, (user) => user.requisitions, {
    cascade: true,
  })
  @JoinColumn({ name: 'USER' })
  public user: User;
}
