export class OrderDto {
  userId?: number;
  amount?: number;
  orderName?: string;
  address?: string;
  phone?: string;
  trackingNumber?: string;
}

export class OrderResultDto {
  id?: number;
  userId?: number;
  amount?: number;
  orderName?: string;
  address?: string;
  phone?: string;
  trackingNumber?: string;
}
