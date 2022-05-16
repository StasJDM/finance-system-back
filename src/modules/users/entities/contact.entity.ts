import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id_from', type: 'uuid' })
  userIdFrom: string;

  @Column({ name: 'user_id_to', type: 'uuid' })
  userIdTo: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_from' })
  userFrom: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_to' })
  userTo: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
