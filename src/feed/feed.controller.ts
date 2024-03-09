import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Feed } from './schemas/feed.schema';
import { Response } from 'express';

@Controller('feed')
export class FeedController {

  constructor(private readonly feedService: FeedService) {}

  @Post()
  async create(@Body() feed: Feed, @Res() res: Response): Promise<Feed> {
    const createdFeed = this.feedService.create(feed);
    res.location('http://localhost:3000/');
    res.status(HttpStatus.FOUND).send();
    return createdFeed;
  }

  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedService.findAll();
  }
}
