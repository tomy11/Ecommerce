import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @Column({ length: 200, nullable: true })
  detailName: string;

  @Column()
  qty: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Order, (p) => p.orderDetail)
  order: Order;

  @ManyToOne(() => Order, (p) => p.orderDetail)
  product: Product;
}
