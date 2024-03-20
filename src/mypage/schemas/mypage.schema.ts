// ./schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MypageDocument = Mypage & Document;

@Schema({ timestamps: true }) // createdAt과 updatedAt을 자동으로 관리합니다.
export class Mypage {
  @Prop()
  user_id: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  content: string;

  @Prop()
  about: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];
}

export const MypageSchema = SchemaFactory.createForClass(Mypage);
