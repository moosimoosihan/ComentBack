// ./schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // createdAt과 updatedAt을 자동으로 관리합니다.
export class Post {
  @Prop()
  user_id: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = Post & Document;
