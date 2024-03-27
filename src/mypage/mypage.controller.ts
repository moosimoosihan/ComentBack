// controllers/mypage.controller.ts
import { Controller, Post, Body, Get, Param, Query, HttpStatus, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { MypageService } from '../mypage/mypage.service';
import { User } from 'src/schemas/user.schema';
import { UpdateNicknameDto, UpdateUserDto } from 'src/Dto/updateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('mypage')
export class MypageController {
  constructor(private readonly MypageService: MypageService) { }

  @Post('/update/:user_id')
  async updateUser(@Param('user_id') userId: string, @Body() { about }: UpdateUserDto, @Res() res: Response): Promise<void> {
    try {
      const updatedUser = await this.MypageService.updateUser(userId, about);
      res.status(HttpStatus.OK).send(updatedUser);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get('/updatedUser/:user_id')
  async getUpdatedUser(@Param('user_id') userId: string, @Query('about') about: string): Promise<User[]> {
    try {
      const users = await this.MypageService.getUpdatedUser(userId, about);
      return users;
    } catch (error) {
      throw new Error('Failed to get updated user: ' + error.message);
    }
  }

  @Post('/updateNickname/:user_id')
  async updateNickname(@Param('user_id') userId: string, @Body() { nickname }: UpdateNicknameDto, @Res() res: Response): Promise<void> {
    try {
      const updatedUser = await this.MypageService.updateNickname(userId, nickname);
      res.status(HttpStatus.OK).send(updatedUser);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  //이미지 업로드

  @Post('image/:user_id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // 이미지 저장 디렉토리
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadImage(@Param('user_id') userId: string, @UploadedFile() image) {
    // 이미지 업로드 후 저장된 파일의 경로를 클라이언트에 응답
    return { imageUrl: image.path };
  }
}