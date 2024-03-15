import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateLikeDto {

  @IsNotEmpty()
  readonly user_id: ObjectId;
  
  @IsNotEmpty()
  readonly feed_id: ObjectId;
}