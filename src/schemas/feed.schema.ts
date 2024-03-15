import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CommentSchema } from "./comment.schema";

export type FeedDocument = Feed & Document;

@Schema()
export class Feed {

  @Prop({type:Types.ObjectId,ref:'User'})
  user_id: Types.ObjectId;

  @Prop()
  title: String;

  @Prop()
  category: String;

  @Prop()
  content: String;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop({default: Date.now})
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop({ type: [CommentSchema] })
  comments: Comment[];

}

export const FeedSchema = SchemaFactory.createForClass(Feed);