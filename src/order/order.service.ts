import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderLogs } from '../orderlogs/entity/orderlogs.entity';
import { Repository } from 'typeorm';
import { OrderDto, OrderResultDto } from './dto/order.dto';
import { Order } from './entity/order.entity';
import { OrderDetail } from 'src/orderdetail/entity/orderdetail.entity';
import { OrderdetailService } from 'src/orderdetail/orderdetail.service';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderLogs)
    private readonly logsRepository: Repository<OrderLogs>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly orderdetailService: OrderdetailService,
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

  async save(idata: OrderDto): Promise<any> {
    try {
      const isDetail: any[] = [];
      const totalCount: any[] = [];
      const totalQty: any[] = [];
      const addProductId: number[] = [];
      const addDetailId: number[] = [];
      const iorder = new Order();
      for (const i of idata.orderDetail) {
        const idetail = new OrderDetail();
        const pd = await this.productRepository.findOne({
          where: { id: i.productId },
        });

        const istotal = pd.total - i.qty;
        const orderCount = pd.price * i.qty;
        totalCount.push(orderCount);
        addProductId.push(i.productId);
        idetail.orderId = iorder.id;
        idetail.productId = i.productId;
        idetail.detailName = i.detailName;
        idetail.qty = i.qty;
        totalQty.push(i.qty);
        await this.orderdetailService.save(idetail);
        isDetail.push(idetail);
        const iproduct = new Product();
        iproduct.name = pd.name;
        iproduct.description = pd.description;
        iproduct.price = pd.price;
        iproduct.total = istotal;
        await this.productRepository.update(i.productId, iproduct);
      }

      iorder.userId = idata.userId;
      iorder.amount = idata.amount;
      iorder.orderName = idata.orderName;
      iorder.address = idata.address;
      iorder.phone = idata.phone;
      iorder.trackingNumber = idata.trackingNumber;
      iorder.orderDetail = isDetail;

      const result: any = await this.orderRepository.save(iorder);

      for (const s of result.orderDetail) {
        addDetailId.push(s.id);
      }

      const priceSum = totalCount.reduce((a, b) => a + b, 0);
      const sumQty = totalQty.reduce((a, b) => a + b, 0);
      this.logger.log('save order success');

      const ilogs = new OrderLogs();
      ilogs.userId = idata.userId;
      ilogs.orderId = result.id;
      ilogs.qty = sumQty;
      ilogs.price = priceSum;
      ilogs.detailId = addDetailId;
      ilogs.productId = addProductId;
      await this.logsRepository.save(ilogs);

      const target: any[] = [{ datas: result, countTotal: priceSum }];

      return target;
    } catch (error) {
      console.log('error save order ', error);
      this.logger.error('error save order ', error);
    }
  }

  async findById(uid: number): Promise<OrderResultDto> {
    try {
      const result = await this.orderRepository.findOne({
        where: { id: uid },
        relations: ['orderDetail'],
      });
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

  async delete(cid: any): Promise<any> {
    try {
      const resOrder = await this.orderRepository.findOne({
        where: { id: cid },
      });
      if (resOrder) {
        const isLogs = await this.logsRepository.findOne({
          where: { userId: resOrder.userId },
        });
        await this.logsRepository.delete(isLogs.id);

        for (const i of resOrder.orderDetail) {
          await this.orderdetailService.delete(i.id);
        }
        await this.orderRepository.delete(cid);
      }

      this.logger.log('delete order success');
      return 'delete order success';
    } catch (error) {
      console.log('error delete order ', error);
    }
  }
}
