import { Module } from '@nestjs/common';
import { OrderdetailService } from './orderdetail.service';
import { OrderdetailController } from './orderdetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entity/orderdetail.entity';
import { Order } from '../order/entity/order.entity';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail, Order, Product])],
  providers: [OrderdetailService],
  controllers: [OrderdetailController],
  exports: [OrderdetailService],
})
export class OrderdetailModule {}
