import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderDetail } from '../orderdetail/entity/orderdetail.entity';
import { OrderLogs } from 'src/orderlogs/entity/orderlogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, OrderLogs])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
