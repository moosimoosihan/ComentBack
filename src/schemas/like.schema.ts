import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type LikeDocument = Like & Document;

@Schema()
export class Like {

  @Prop({required: true, ref: 'User'})
  user_id: Types.ObjectId;

  @Prop({required: true, ref: 'Feed'})
  feed_id: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);