import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';
import { MypageController } from './mypage/mypage.controller';
import { MypageService } from './mypage/mypage.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from './feed/feed.module';
import { Feed, FeedSchema } from './schemas/feed.schema';
import { Like, LikeSchema } from './schemas/like.schema';
import { User, UserSchema } from './schemas/user.schema';
import { Mypage, MypageSchema } from './mypage/schemas/mypage.schema';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Feed.name, schema: FeedSchema },
    { name: Like.name, schema: LikeSchema },
    { name: User.name, schema: UserSchema },
    { name: Mypage.name, schema: MypageSchema },
    { name: Comment.name, schema: CommentSchema }]),
  MongooseModule.forRoot('mongodb://127.0.0.1/coment')
  ],
  controllers: [AppController, FeedController, MypageController, LoginController, CommentController],
  providers: [AppService, FeedService, MypageService, LoginService, CommentService],
})
export class AppModule { }
