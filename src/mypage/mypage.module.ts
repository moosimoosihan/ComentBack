import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from '../mypage/mypage.controller';
import { PostsService } from '../mypage/mypage.service';
import { Post, PostSchema } from '../mypage/schemas/mypage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
