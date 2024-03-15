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
import { Feed, FeedSchema } from './feed/schemas/feed.schema';
import { Like, LikeSchema } from './feed/schemas/like.schema';
import { User, UserSchema } from './feed/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema}, {name: Like.name, schema: LikeSchema},{name:User.name,schema:UserSchema}]), MongooseModule.forRoot('mongodb://localhost:27017/coment')],
  controllers: [AppController, FeedController, MypageController, LoginController],
  providers: [AppService, FeedService, MypageService, LoginService],
})
export class AppModule {}
