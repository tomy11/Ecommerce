import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLogs } from './entity/orderlogs.entity';

@Injectable()
export class OrderlogsService {
  private readonly logger = new Logger(OrderlogsService.name);
  constructor(
    @InjectRepository(OrderLogs)
    private readonly orderLogsRepository: Repository<OrderLogs>,
  ) {}

  async findAll(current: number, pageSize: number): Promise<any[]> {
    try {
      const [_results, _count] = await Promise.all([
        this.orderLogsRepository.find({
          order: { id: 'DESC' },
          skip: (current - 1) * pageSize,
          take: pageSize,
        }),
        this.orderLogsRepository.count(),
      ]);
      const result: any[] = [{ datas: _results, countTotal: _count }];
      this.logger.log('find all logs success');
      return result;
    } catch (error) {
      console.log('error findall logs ', error);
      this.logger.error('error findall logs ', error);
    }
  }

  async save(idata: OrderLogs): Promise<OrderLogs> {
    try {
      const ilogs = new OrderLogs();
      ilogs.userId = idata.userId;
      ilogs.orderId = idata.orderId;
      ilogs.qty = idata.qty;
      ilogs.price = idata.price;
      ilogs.detailId = idata.detailId;
      ilogs.productId = idata.productId;
      const result: any = await this.orderLogsRepository.save(ilogs);
      this.logger.log('save logs success');
      return result;
    } catch (error) {
      console.log('error logs detail ', error);
      this.logger.error('error logs detail ', error);
    }
  }

  async findByUserId(userId: number): Promise<OrderLogs> {
    try {
      const result = await this.orderLogsRepository.findOne({
        where: { userId: userId },
      });
      if (result) {
        this.logger.log('find UserId success');
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log('error find UserId ', error);
      this.logger.error('error find UserId ', error);
    }
  }

  async findById(uid: number): Promise<OrderLogs> {
    try {
      const result = await this.orderLogsRepository.findOne({
        where: { id: uid },
      });
      this.logger.log('find by logs id success');
      return result;
    } catch (error) {
      console.log('error find by logs id', error);
      this.logger.error('error find by logs id ', error);
    }
  }
}
