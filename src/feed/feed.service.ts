import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedService {
  constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>) {}

  async create(feed: Feed): Promise<Feed> {
    const createdFeed = new this.feedModel(feed);
    return createdFeed.save();
  }

  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().exec();
  }
}