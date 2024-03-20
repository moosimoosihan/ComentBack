import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateCommentDto {

  @IsNotEmpty()
  readonly user_id: ObjectId;

  @IsNotEmpty()
  readonly feed_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly comment: string;
}