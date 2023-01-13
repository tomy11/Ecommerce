import { Test, TestingModule } from '@nestjs/testing';
import { OrderlogsController } from '../../src/orderlogs/orderlogs.controller';

describe('OrderlogsController', () => {
  let controller: OrderlogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderlogsController],
    }).compile();

    controller = module.get<OrderlogsController>(OrderlogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
