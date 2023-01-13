import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailDto } from './dto/orderdetail.dto';
import { OrderDetail } from './entity/orderdetail.entity';

@Injectable()
export class OrderdetailService {
  private readonly logger = new Logger(OrderdetailService.name);
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async findAll(current: number, pageSize: number): Promise<any[]> {
    try {
      const [_results, _count] = await Promise.all([
        this.orderDetailRepository.find({
          order: { id: 'DESC' },
          skip: (current - 1) * pageSize,
          take: pageSize,
        }),
        this.orderDetailRepository.count(),
      ]);
      const result: any[] = [{ datas: _results, countTotal: _count }];
      this.logger.log('find all order detail success');
      return result;
    } catch (error) {
      console.log('error fin dall order detail ', error);
      this.logger.error('error findall order detail ', error);
    }
  }

  async save(idata: OrderDetailDto): Promise<OrderDetailDto> {
    try {
      const idetail = new OrderDetail();
      idetail.orderId = idata.orderId;
      idetail.productId = idata.productId;
      idetail.detailName = idata.detailName;
      idetail.qty = idata.qty;
      const result: any = await this.orderDetailRepository.save(idetail);
      this.logger.log('save order detail success');
      return result;
    } catch (error) {
      console.log('error save order detail ', error);
      this.logger.error('error save order detail ', error);
    }
  }

  async findById(uid: number): Promise<OrderDetailDto> {
    try {
      const result = await this.orderDetailRepository.findOne({
        where: { id: uid },
      });
      this.logger.log('find by order detail id success');
      return result;
    } catch (error) {
      console.log('error find by order detail id', error);
      this.logger.error('error find by order detail id ', error);
    }
  }

  async update(id: any, idata: any): Promise<OrderDetailDto> {
    try {
      const idetail = await this.orderDetailRepository.findOne(id);
      idetail.orderId = idata.orderId;
      idetail.productId = idata.productId;
      idetail.detailName = idata.detailName;
      idetail.qty = idata.qty;
      const result: any = await this.orderDetailRepository.update(id, idetail);

      this.logger.log('update order detail success');
      return result;
    } catch (error) {
      console.log('error update order detail ', error);
      this.logger.error('error update order detail ', error);
    }
  }

  async delete(uid: any): Promise<any> {
    try {
      const result: any = await this.orderDetailRepository.delete(uid);
      this.logger.log('update order detail success');
      return result;
    } catch (error) {
      console.log('error delete order detail ', error);
    }
  }
}
