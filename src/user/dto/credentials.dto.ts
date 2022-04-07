import { IsNotEmpty } from "class-validator";

export class CredentialsDto {
  @IsNotEmpty()
  username : string ;

  @IsNotEmpty()
  password : string ;
}
