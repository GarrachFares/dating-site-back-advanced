import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUserDto } from 'src/user/dto/add-user.dto';
import { CredentialsDto } from 'src/user/dto/credentials.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(
    @Body() registerUserDto: AddUserDto) : Promise<any>//token later
  {
      return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(
    @Body() credentials: CredentialsDto) : Promise<any>//later 
  {
    return this.authService.login(credentials);
  }

}