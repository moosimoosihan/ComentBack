import { Test, TestingModule } from '@nestjs/testing';
import { FeedControllerController } from './feed-controller.controller';

describe('FeedControllerController', () => {
  let controller: FeedControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedControllerController],
    }).compile();

    controller = module.get<FeedControllerController>(FeedControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
