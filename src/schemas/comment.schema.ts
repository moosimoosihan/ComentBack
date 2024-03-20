import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

  @Prop()
  user_id: string;

  @Prop()
  comment: string;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop({default: Date.now})
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);