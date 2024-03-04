import { Test, TestingModule } from '@nestjs/testing';
import { MyPageServiceService } from './my-page-service.service';

describe('MyPageServiceService', () => {
  let service: MyPageServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyPageServiceService],
    }).compile();

    service = module.get<MyPageServiceService>(MyPageServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
