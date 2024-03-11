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
  @Get('/:feed_id')
  async findOne(@Param('feed_id') feed_id: string): Promise<Feed> {
    return this.feedService.findOne(feed_id);
  }

  // 피드 수정
  @Post('/:feed_id')
  async update(@Param('feed_id') feed_id: string, @Body() feed: Feed, @Res() res: Response): Promise<Feed> {
    const updatedFeed = this.feedService.update(feed_id, feed);
    res.location('http://localhost:3000/'); // 주소는 나중에 수정
    res.status(HttpStatus.FOUND).send();
    return updatedFeed;
  }

  // 피드 삭제
  @Post('/:feed_id/delete')
  async remove(@Param('feed_id') feed_id: string, @Res() res: Response): Promise<Feed> {
    const removedFeed = this.feedService.remove(feed_id);
    res.location('http://localhost:3000/'); // 주소는 나중에 수정
    res.status(HttpStatus.FOUND).send();
    return removedFeed;
  }

  // 카테고리별 피드 조회
  @Get('/category/:category')
  async findByCategory(@Param('category') category: string): Promise<Feed[]> {
    return this.feedService.findByCategory(category);
  }

  // 피드 검색
  @Get('/search/:keyword')
  async search(@Param('keyword') keyword: string): Promise<Feed[]> {
    return this.feedService.search(keyword);
  }

  // 피드 좋아요
  @Post('/like/:feed_id/:user_id')
  async like(@Param('feed_id') feed_id: string, @Param('user_id') user_id: string){
    this.feedService.like(feed_id, user_id);
  }

  // 피드 좋아요 취소
  @Post('/unlike/:feed_id/:user_id')
  async unlike(@Param('feed_id') feed_id: string, @Param('user_id') user_id: string){
    this.feedService.unlike(feed_id, user_id);
  }

  // 좋아요 수 조회
  @Get('/like/:feed_id')
  async getLikeCount(@Param('feed_id') feed_id: string): Promise<number> {
    return this.feedService.countLikes(feed_id);
  }
}
