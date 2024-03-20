import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema";
import { Feed } from "./feed.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: Types.ObjectId, ref: 'Feed' })
  feed_id: Feed;

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