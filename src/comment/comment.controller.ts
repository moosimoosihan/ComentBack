import { Comment } from './../schemas/comment.schema';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Response } from 'express';
import { CreateCommentDto } from 'src/Dto/createComment.dto';

@Controller('comment')
export class CommentController {

  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: CreateCommentDto) {
    const createComment = this.commentService.create(comment);
    return createComment;
  }
}
