import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Comment } from "./comment.schema";
import { User } from "./user.schema";
import { Like } from "./like.schema";

export type FeedDocument = Feed & Document;

@Schema()
export class Feed {

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

  @Prop({ type: Types.ObjectId, ref:'User' })
  user_id: Types.ObjectId | User;

  @Prop({ type: [Types.ObjectId], ref:'Comment' }) // Comment 스키마와의 관계 설정
  comments: (Types.ObjectId | Comment)[];

  @Prop({ type: [Types.ObjectId], ref:'Like' })
  likes: (Types.ObjectId | Like)[];
}

export const FeedSchema = SchemaFactory.createForClass(Feed);