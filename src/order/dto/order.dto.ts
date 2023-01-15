import { OrderDetailDto } from 'src/orderdetail/dto/orderdetail.dto';

export class OrderDto {
  userId?: number;
  amount?: number;
  orderName?: string;
  address?: string;
  phone?: string;
  trackingNumber?: string;
  orderDetail?: OrderDetailDto[];
}

export class OrderResultDto {
  id?: number;
  userId?: number;
  amount?: number;
  orderName?: string;
  address?: string;
  phone?: string;
  trackingNumber?: string;
  orderDetail?: OrderDetailDto[];
}
