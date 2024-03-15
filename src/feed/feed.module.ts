import { Module, Controller } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from '../schemas/feed.schema';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema}])],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {}
