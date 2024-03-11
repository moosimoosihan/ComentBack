import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LikeDocument = Like & Document;

@Schema()
export class Like {

  @Prop({required: true})
  user_id: String;

  @Prop({required: true})
  feed_id: String;
}

export const LikeSchema = SchemaFactory.createForClass(Like);