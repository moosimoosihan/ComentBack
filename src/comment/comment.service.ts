import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { timeInterval } from 'rxjs';
import { CreateCommentDto } from 'src/Dto/createComment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Feed, FeedDocument } from 'src/schemas/feed.schema';

@Injectable()
export class CommentService {

  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>
  ) {}

  //댓글 생성
  async create(comment: string) {
    const createComment = new this.commentModel(comment);
    return createComment.save();
  }

  async addCommentToFeed(feed_id: string, comment_id: ObjectId) {
    const feed = await this.feedModel.findById(feed_id);
    if(!feed) {
      throw new Error('Feed not found');
    }

    const comment = await this.commentModel.findById(comment_id);
    if(!comment) {
      throw new Error('Comment not found');
    }

    feed.comments.push(comment._id);
    return await feed.save();
  }

  // 댓글 수 조회
  async countComments(feed_id: string): Promise<number> {
    return this.commentModel.countDocuments({ feed_id: feed_id });
  }

}
