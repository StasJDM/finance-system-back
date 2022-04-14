import { User } from 'src/modules/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  id_from: string;

  @Column({ type: 'uuid' })
  id_to: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_from' })
  from: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'if_to' })
  to: User;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'varchar' })
  label: string;

  @ManyToMany(() => Category, (category) => category.transactions)
  categories: Category[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
