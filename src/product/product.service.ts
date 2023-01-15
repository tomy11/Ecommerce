import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(current: number, pageSize: number): Promise<any[]> {
    try {
      const [_results, _count] = await Promise.all([
        this.productRepository.find({
          order: { id: 'DESC' },
          skip: (current - 1) * pageSize,
          take: pageSize,
        }),
        this.productRepository.count(),
      ]);
      const result: any[] = [{ datas: _results, countTotal: _count }];
      this.logger.log('findall product success');
      return result;
    } catch (error) {
      console.log('error findall product ', error);
      this.logger.error('error findall product ', error);
    }
  }

  async save(idata: ProductDto): Promise<ProductDto> {
    try {
      const inputs = new Product();
      inputs.name = idata.name;
      inputs.description = idata.description;
      inputs.price = idata.price;
      inputs.total = idata.total;
      const result: any = await this.productRepository.save(inputs);
      this.logger.log('save product success');
      return result;
    } catch (error) {
      console.log('error save product ', error);
      this.logger.error('error save product ', error);
    }
  }

  async findById(uid: number): Promise<ProductDto> {
    try {
      const result = await this.productRepository.findOne({
        where: { id: uid },
        relations: ['orderDetail'],
      });
      this.logger.log('find by product id success');
      return result;
    } catch (error) {
      console.log('error find by product id', error);
      this.logger.error('error find by product id ', error);
    }
  }

  async update(id: any, idata: ProductDto): Promise<ProductDto> {
    try {
      const inputs = await this.productRepository.findOne(id);
      inputs.name = idata.name;
      inputs.description = idata.description;
      inputs.price = idata.price;
      inputs.total = idata.total;
      const result: any = await this.productRepository.update(id, inputs);

      this.logger.log('update product success');
      return result;
    } catch (error) {
      console.log('error update product ', error);
      this.logger.error('error update product ', error);
    }
  }

  async delete(uid: any): Promise<any> {
    try {
      const result: any = await this.productRepository.delete(uid);
      this.logger.log('update product success');
      return result;
    } catch (error) {
      console.log('error delete product ', error);
    }
  }
}
