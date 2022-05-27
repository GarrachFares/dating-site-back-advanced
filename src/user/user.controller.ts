import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { CredentialsDto } from "./dto/credentials.dto";
import { diskStorage } from 'multer';
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./upload.utils";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
import { AuthService } from "src/auth/auth.service";
import { use } from "passport";


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
  @Get('/:id')
  findOneById(@Param() id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  

  

}
