import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';


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
