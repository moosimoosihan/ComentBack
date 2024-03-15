import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateCommentDto {

  @IsNotEmpty()
  readonly user_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}