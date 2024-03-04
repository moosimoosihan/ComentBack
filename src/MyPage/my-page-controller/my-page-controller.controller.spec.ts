import { Test, TestingModule } from '@nestjs/testing';
import { MyPageControllerController } from './my-page-controller.controller';

describe('MyPageControllerController', () => {
  let controller: MyPageControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyPageControllerController],
    }).compile();

    controller = module.get<MyPageControllerController>(MyPageControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
