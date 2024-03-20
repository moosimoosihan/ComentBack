// posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MypageService } from '../mypage/mypage.service'; // 경로는 실제 구조에 따라 달라질 수 있습니다.

@Controller('mypage')
export class MypageController {
  constructor(private readonly postsService: MypageService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
