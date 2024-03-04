import { Test, TestingModule } from '@nestjs/testing';
import { FeedServiceService } from './feed-service.service';

describe('FeedServiceService', () => {
  let service: FeedServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedServiceService],
    }).compile();

    service = module.get<FeedServiceService>(FeedServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
