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
import { OrderDetailDto } from './dto/orderdetail.dto';
import { OrderdetailService } from './orderdetail.service';

@Controller('orderdetail')
export class OrderdetailController {
  private readonly logger = new Logger(OrderdetailController.name);
  constructor(private readonly orderDetailRepository: OrderdetailService) {}
  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<IResponse> {
    try {
      const current: number = limit ? limit : 100;
      const pageSize: number = offset ? offset : 0;
      const result = await this.orderDetailRepository.findAll(
        current,
        pageSize,
      );
      const resultData: IResponse = {
        message: 'find orderdetail all successfuly',
        data: result,
      };
      this.logger.log('find orderdetail all successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find orderdetail all error',
        data: error.message,
      };
      this.logger.log('find orderdetail all error', error);
      return resultData;
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.orderDetailRepository.findById(id);
      const resultData: IResponse = {
        message: 'find orderdetail successfuly',
        data: result,
      };
      this.logger.log('find orderdetail successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find orderdetail error',
        data: error.message,
      };
      this.logger.log('find orderdetail error', error);
      return resultData;
    }
  }

  @Post('/save')
  async save(@Body() idata: OrderDetailDto): Promise<IResponse> {
    try {
      const result = await this.orderDetailRepository.save(idata);
      const resultData: IResponse = {
        message: 'save orderdetail successfuly',
        data: result,
      };
      this.logger.log('save orderdetail successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'save orderdetail error',
        data: error.message,
      };
      this.logger.log('save orderdetail error', error);
      return resultData;
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() idata: OrderDetailDto,
  ): Promise<IResponse> {
    try {
      const result = await this.orderDetailRepository.update(id, idata);
      const resultData: IResponse = {
        message: 'update orderdetail successfuly',
        data: result,
      };
      this.logger.log('update orderdetail successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'update orderdetail error',
        data: error.message,
      };
      this.logger.log('update orderdetail error', error);
      return resultData;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.orderDetailRepository.delete(id);
      const resultData: IResponse = {
        message: 'delete orderdetail by id successfuly',
        data: result,
      };
      this.logger.log('delete orderdetail by id successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'delete orderdetail by id error',
        data: error.message,
      };
      this.logger.log('delete orderdetail by id error', error);
      return resultData;
    }
  }
}
