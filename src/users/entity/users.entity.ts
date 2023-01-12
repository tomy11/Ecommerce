import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 200 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column('text')
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 255 })
  @Index()
  userNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
