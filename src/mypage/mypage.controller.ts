// posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../mypage/mypage.service'; // 경로는 실제 구조에 따라 달라질 수 있습니다.

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
