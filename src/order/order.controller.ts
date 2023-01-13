import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IResponse } from 'src/utils/interface/IResponse';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderRepository: OrderService) {}

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<IResponse> {
    try {
      const current: number = limit ? limit : 100;
      const pageSize: number = offset ? offset : 0;
      const result = await this.orderRepository.findAll(current, pageSize);
      const resultData: IResponse = {
        message: 'find order all successfuly',
        data: result,
      };
      this.logger.log('find order all successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find order all error',
        data: error.message,
      };
      this.logger.log('find order all error', error);
      return resultData;
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.orderRepository.findById(id);
      const resultData: IResponse = {
        message: 'find order successfuly',
        data: result,
      };
      this.logger.log('find order successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find order error',
        data: error.message,
      };
      this.logger.log('find order error', error);
      return resultData;
    }
  }

  @Post('/save')
  async save(@Body() idata: OrderDto): Promise<IResponse> {
    try {
      const result = await this.orderRepository.save(idata);
      const resultData: IResponse = {
        message: 'save order successfuly',
        data: result,
      };
      this.logger.log('save order successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'save order error',
        data: error.message,
      };
      this.logger.log('save order error', error);
      return resultData;
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() idata: OrderDto,
  ): Promise<IResponse> {
    try {
      const result = await this.orderRepository.update(id, idata);
      const resultData: IResponse = {
        message: 'update order successfuly',
        data: result,
      };
      this.logger.log('update order successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'update order error',
        data: error.message,
      };
      this.logger.log('update order error', error);
      return resultData;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.orderRepository.delete(id);
      const resultData: IResponse = {
        message: 'delete order by id successfuly',
        data: result,
      };
      this.logger.log('delete order by id successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'delete order by id error',
        data: error.message,
      };
      this.logger.log('delete order by id error', error);
      return resultData;
    }
  }
}
