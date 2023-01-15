import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderDetail } from '../orderdetail/entity/orderdetail.entity';
import { OrderLogs } from 'src/orderlogs/entity/orderlogs.entity';
import { OrderdetailService } from 'src/orderdetail/orderdetail.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, OrderLogs, Product])],
  providers: [OrderService, OrderdetailService, ProductService],
  controllers: [OrderController],
  exports: [OrderService, OrderdetailService, ProductService],
})
export class OrderModule {}
