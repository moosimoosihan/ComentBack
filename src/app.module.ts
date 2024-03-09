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

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema}]), MongooseModule.forRoot('mongodb://ezen:1234@localhost:27017/?authMechanism=DEFAULT')],
  controllers: [AppController, FeedController, MypageController, LoginController],
  providers: [AppService, FeedService, MypageService, LoginService],
})
export class AppModule {}
