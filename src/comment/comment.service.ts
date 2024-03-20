import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from 'src/Dto/createComment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {

  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  //댓글 생성
  async create(comment: CreateCommentDto) {
    const createComment = new this.commentModel(comment);
    return createComment.save();
  }

  // 댓글 수 조회
  async countComments(feed_id: string): Promise<number> {
    return this.commentModel.countDocuments({ feed_id: feed_id });
  }

}
