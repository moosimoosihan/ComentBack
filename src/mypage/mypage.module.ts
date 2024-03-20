import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MypageController } from '../mypage/mypage.controller';
import { MypageService } from '../mypage/mypage.service';
import { Mypage, MypageSchema } from '../mypage/schemas/mypage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mypage.name, schema: MypageSchema }]),
  ],
  controllers: [MypageController],
  providers: [MypageService],
})
export class MypageModule { }
