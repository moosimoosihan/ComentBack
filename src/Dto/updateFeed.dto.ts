import { IsNotEmpty, IsString, IsDate } from "class-validator";
import { ObjectId } from "mongoose";


export class UpdateFeedDto {

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
  
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date = new Date();
}