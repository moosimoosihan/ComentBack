// posts.controller.ts
import { Controller,Post,Body, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { PostsService } from '../mypage/mypage.service'; // 경로는 실제 구조에 따라 달라질 수 있습니다.
import { Response } from 'express';
import { User } from 'src/schemas/user.schema';
import { UpdateUserDto } from 'src/Dto/updateUser.dto';

@Controller('posts')
export class UsersController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/:_id')
  async addUserNewData(@Param('_id') id: string, @Body() newData: UpdateUserDto, @Res() res: Response): Promise<User> {
  try {
    const updatedPost = await this.postsService.addUserNewData(id, newData);
    res.location('http://localhost:3000/'); // 리다이렉트할 URL
    res.status(HttpStatus.FOUND).send();
    return updatedPost;
  } catch (error) {
    throw new Error('Failed to add new data: ' + error.message);
  }
}
}

