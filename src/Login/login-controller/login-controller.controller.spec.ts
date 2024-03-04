import { Test, TestingModule } from '@nestjs/testing';
import { LoginControllerController } from './login-controller.controller';

describe('LoginControllerController', () => {
  let controller: LoginControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginControllerController],
    }).compile();

    controller = module.get<LoginControllerController>(LoginControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
