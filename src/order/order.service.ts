import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto, OrderResultDto } from './dto/order.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(current: number, pageSize: number): Promise<any[]> {
    try {
      const [_results, _count] = await Promise.all([
        this.orderRepository.find({
          order: { id: 'DESC' },
          skip: (current - 1) * pageSize,
          take: pageSize,
        }),
        this.orderRepository.count(),
      ]);
      const result: any[] = [{ datas: _results, countTotal: _count }];
      this.logger.log('findall order success');
      return result;
    } catch (error) {
      console.log('error findall order ', error);
      this.logger.error('error findall order ', error);
    }
  }

  async save(idata: OrderDto): Promise<OrderDto> {
    try {
      const iorder = new Order();
      iorder.userId = idata.userId;
      iorder.amount = idata.amount;
      iorder.orderName = idata.orderName;
      iorder.address = idata.address;
      iorder.phone = idata.phone;
      iorder.trackingNumber = idata.trackingNumber;

      const result: any = await this.orderRepository.save(iorder);
      this.logger.log('save order success');
      return result;
    } catch (error) {
      console.log('error save order ', error);
      this.logger.error('error save order ', error);
    }
  }

  async findById(uid: number): Promise<OrderResultDto> {
    try {
      const result = await this.orderRepository.findOne({ where: { id: uid } });
      this.logger.log('find by order id success');
      return result;
    } catch (error) {
      console.log('error find by order id', error);
      this.logger.error('error find by order id ', error);
    }
  }

  async findByUserId(orid: number): Promise<any[]> {
    try {
      const result = await this.orderRepository.find({
        where: { userId: orid },
      });
      this.logger.log('find by order id success');
      return result;
    } catch (error) {
      console.log('error find by order id', error);
      this.logger.error('error find by order id ', error);
    }
  }

  async update(id: any, idata: any): Promise<OrderResultDto> {
    try {
      const iorder = await this.orderRepository.findOne(id);
      iorder.userId = idata.userId;
      iorder.amount = idata.amount;
      iorder.orderName = idata.orderName;
      iorder.address = idata.address;
      iorder.phone = idata.phone;
      iorder.trackingNumber = idata.trackingNumber;
      const result: any = await this.orderRepository.update(id, iorder);

      this.logger.log('update order success');
      return result;
    } catch (error) {
      console.log('error update order ', error);
      this.logger.error('error update order ', error);
    }
  }

  async delete(uid: any): Promise<any> {
    try {
      const result: any = await this.orderRepository.delete(uid);
      this.logger.log('update order success');
      return result;
    } catch (error) {
      console.log('error delete order ', error);
    }
  }
}
