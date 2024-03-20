// controllers/mypage.controller.ts
import { Controller, Post, Body, Get, Param, Query, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { MypageService } from '../mypage/mypage.service';
import { User } from 'src/schemas/user.schema';
import { UpdateNicknameDto, UpdateUserDto } from 'src/Dto/updateUser.dto';

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
}