import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from 'src/Dto/createComment.dto';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {

  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(comment: CreateCommentDto) {
    const createComment = new this.commentModel(comment);
    return createComment.save();
  }

}
