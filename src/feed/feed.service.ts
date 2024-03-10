import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedService {
  constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>) {}

  // 피드 생성
  async create(feed: Feed): Promise<Feed> {
    const createdFeed = new this.feedModel(feed);
    return createdFeed.save();
  }

  // 모든 피드 조회
  async findAll(): Promise<Feed[]> {
    return this.feedModel.find().exec();
  }

  // 특정 피드 조회
  async findOne(id: string): Promise<Feed> {
    return this.feedModel.findById(id);
  }

  // 피드 수정
  async update(id: string, feed: Feed): Promise<Feed> {
    return this.feedModel.findByIdAndUpdate(id, feed, { new: true });
  }

  // 피드 삭제
  async remove(id: string): Promise<Feed> {
    try{
      let f = await this.feedModel.findById(id);
      if(f.get('deletedAt') === undefined) {
        f.set('deletedAt', Date.now());
        return this.feedModel.findByIdAndUpdate(id, f, { new: true });
      } else {
        throw new Error('Feed already deleted');
      }
    } catch(e) {
      return e;
    }
  }

  // 카테고리별 피드 조회
  async findByCategory(category: string): Promise<Feed[]> {
    return this.feedModel.find({ category: category });
  }
}