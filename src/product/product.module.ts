import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { OrderDetail } from 'src/orderdetail/entity/orderdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, OrderDetail])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
