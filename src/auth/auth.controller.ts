import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';

import { AddUserDto } from 'src/user/dto/add-user.dto';
import { CredentialsDto } from 'src/user/dto/credentials.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


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

  @UseGuards(JwtAuthGuard)
  @Get('guardtest')
  test(
    @User() user
  ){
    console.log("extracted user",user);
    
    return{
      //msg:'passport jwt auth guard works!!!'
      msg : user 
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('editprofil')
  editProfil(
    @Body() editUserDto: any) : Promise<any>//token later
  {
      return this.authService.register(editUserDto);
  }

}