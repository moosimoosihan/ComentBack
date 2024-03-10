import { Controller, Post, Body, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Feed } from './schemas/feed.schema';
import { Response } from 'express';

@Controller('feed')
export class FeedController {

  constructor(private readonly feedService: FeedService) {}

  // 피드 생성
  @Post()
  async create(@Body() feed: Feed, @Res() res: Response): Promise<Feed> {
    const createdFeed = this.feedService.create(feed);
    res.location('http://localhost:3000/');
    res.status(HttpStatus.FOUND).send();
    return createdFeed;
  }

  // 모든 피드 조회
  @Get()
  async findAll(): Promise<Feed[]> {
    return this.feedService.findAll();
  }

  // 특정 피드 조회
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Feed> {
    return this.feedService.findOne(id);
  }

  // 피드 수정
  @Post('/:id')
  async update(@Param('id') id: string, @Body() feed: Feed, @Res() res: Response): Promise<Feed> {
    const updatedFeed = this.feedService.update(id, feed);
    res.location('http://localhost:3000/'); // 주소는 나중에 수정
    res.status(HttpStatus.FOUND).send();
    return updatedFeed;
  }

  // 피드 삭제
  @Post('/:id/delete')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Feed> {
    const removedFeed = this.feedService.remove(id);
    res.location('http://localhost:3000/'); // 주소는 나중에 수정
    res.status(HttpStatus.FOUND).send();
    return removedFeed;
  }

  // 카테고리별 피드 조회
  @Get('/category/:category')
  async findByCategory(@Param('category') category: string): Promise<Feed[]> {
    return this.feedService.findByCategory(category);
  }
}
