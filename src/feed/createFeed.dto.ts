import { IsNotEmpty, IsString } from "class-validator";


export class CreateFeedDto {

  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

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