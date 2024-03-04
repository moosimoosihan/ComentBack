import { Test, TestingModule } from '@nestjs/testing';
import { LoginServiceService } from './login-service.service';

describe('LoginServiceService', () => {
  let service: LoginServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginServiceService],
    }).compile();

    service = module.get<LoginServiceService>(LoginServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
