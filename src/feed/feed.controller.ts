import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Feed } from './schemas/feed.schema';

@Controller('feed')
export class FeedController {

  constructor(private readonly feedService: FeedService) {}

  @Post()
  async create(@Body() feed: Feed): Promise<Feed> {
    return this.feedService.create(feed);
  }

  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedService.findAll();
  }
}
