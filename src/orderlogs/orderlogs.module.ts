import { Module } from '@nestjs/common';
import { OrderlogsService } from './orderlogs.service';
import { OrderlogsController } from './orderlogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLogs } from './entity/orderlogs.entity';
import { Order } from 'src/order/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLogs])],
  providers: [OrderlogsService],
  controllers: [OrderlogsController],
  exports: [OrderlogsService],
})
export class OrderlogsModule {}
