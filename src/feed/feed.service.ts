import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feed, FeedDocument } from './schemas/feed.schema';
import { Like, LikeDocument } from './schemas/like.schema';
import { CreateFeedDto } from './createFeed.dto';

@Injectable()
export class FeedService {
  constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>, @InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  // 피드 생성
  async create(feed: CreateFeedDto): Promise<Feed> {
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
    feed.updatedAt = new Date;
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

  // 피드 검색
  async search(keyword: string): Promise<Feed[]> {
    return this.feedModel.find({ title: { $regex: keyword } });
  }

  // 피드 좋아요
  async like(feed_id: string, user_id: string){
    try{
      let l = new this.likeModel({ feed_id: feed_id, user_id: user_id });
      l.save();
    } catch(e) {
      return e;
    }
  }

  // 피드 좋아요 취소
  async unlike(feed_id: string, user_id: string) {
    await this.likeModel.deleteMany({ feed_id: feed_id, user_id: user_id });
  }

  // 좋아요 수 조회
  async countLikes(feed_id: string): Promise<number> {
    return this.likeModel.countDocuments({ feed_id: feed_id });
  }
}