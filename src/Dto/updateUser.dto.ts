import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly about: string;
}