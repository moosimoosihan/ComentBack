import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateFeedDto {

  @IsNotEmpty()
  readonly user_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
  
}