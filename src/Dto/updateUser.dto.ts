import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  about: string;
}

export class UpdateNicknameDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
