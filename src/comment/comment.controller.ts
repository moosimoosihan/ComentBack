import { Comment } from './../schemas/comment.schema';
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/Dto/createComment.dto';

@Controller('comment')
export class CommentController {

  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: CreateCommentDto) {
    const createComment = this.commentService.create(comment);
    return createComment;
  }

  @Get('/count/:feed_id')
  async count(@Param('feed_id') feed_id: string): Promise<number> {
    return this.commentService.countComments(feed_id);
  }
}
