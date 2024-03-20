import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  email: String;

  @Prop()
  nickname: String;
  
  @Prop()
  socialType: String;

  @Prop({default: Date.now})
  createdAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  about:String;
}

export const UserSchema = SchemaFactory.createForClass(User);