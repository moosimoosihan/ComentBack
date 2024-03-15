import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: String;

  @IsNotEmpty()
  @IsString()
  readonly nickname: string;

  @IsNotEmpty()
  @IsString()
  readonly socialType: string;
}