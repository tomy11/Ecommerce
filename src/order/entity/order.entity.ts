import { OrderDetail } from 'src/orderdetail/entity/orderdetail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column({ length: 200 })
  orderName: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 100, nullable: true })
  trackingNumber: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (c) => c.order, { cascade: true })
  orderDetail: OrderDetail[];
}
