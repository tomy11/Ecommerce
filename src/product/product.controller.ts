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
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productRepository: ProductService) {}

  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<IResponse> {
    try {
      const current: number = limit ? limit : 100;
      const pageSize: number = offset ? offset : 0;
      const result = await this.productRepository.findAll(current, pageSize);
      const resultData: IResponse = {
        message: 'find product all successfuly',
        data: result,
      };
      this.logger.log('find product all successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find product all error',
        data: error.message,
      };
      this.logger.log('find product all error', error);
      return resultData;
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.productRepository.findById(id);
      const resultData: IResponse = {
        message: 'find product successfuly',
        data: result,
      };
      this.logger.log('find product successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find product error',
        data: error.message,
      };
      this.logger.log('find product error', error);
      return resultData;
    }
  }

  @Post('/save')
  async save(@Body() idata: ProductDto): Promise<IResponse> {
    try {
      const result = await this.productRepository.save(idata);
      const resultData: IResponse = {
        message: 'save product successfuly',
        data: result,
      };
      this.logger.log('save product successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'save product error',
        data: error.message,
      };
      this.logger.log('save product error', error);
      return resultData;
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() idata: ProductDto,
  ): Promise<IResponse> {
    try {
      const result = await this.productRepository.update(id, idata);
      const resultData: IResponse = {
        message: 'update product successfuly',
        data: result,
      };
      this.logger.log('update product successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'update product error',
        data: error.message,
      };
      this.logger.log('update product error', error);
      return resultData;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.productRepository.delete(id);
      const resultData: IResponse = {
        message: 'delete product by id successfuly',
        data: result,
      };
      this.logger.log('delete product by id successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'delete product by id error',
        data: error.message,
      };
      this.logger.log('delete product by id error', error);
      return resultData;
    }
  }
}
