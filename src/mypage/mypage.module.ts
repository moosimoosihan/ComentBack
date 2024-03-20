import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MypageController } from '../mypage/mypage.controller';
import { MypageService } from '../mypage/mypage.service';
import { Post, PostSchema } from '../mypage/schemas/mypage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [MypageController],
  providers: [MypageService],
})
export class PostsModule { }
