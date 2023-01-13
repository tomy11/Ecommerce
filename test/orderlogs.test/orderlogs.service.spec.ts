import { Test, TestingModule } from '@nestjs/testing';
import { OrderlogsService } from '../../src/orderlogs/orderlogs.service';

describe('OrderlogsService', () => {
  let service: OrderlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderlogsService],
    }).compile();

    service = module.get<OrderlogsService>(OrderlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
