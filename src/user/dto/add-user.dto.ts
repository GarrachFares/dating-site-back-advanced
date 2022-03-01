import { IsString, Max, Min } from 'class-validator';

export class AddUserDto {
  @IsString()
  @Max(50)
  @Min(3)
  pseudoName: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}
