import { IsEmail, IsString, Max, Min } from "class-validator";

export class AddUserDto {
  @IsString()
  @Max(50)
  @Min(3)
  username: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string ;
  @IsString()
  password : string ;
}
