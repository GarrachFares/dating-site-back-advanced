import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AddUserDto } from './dto/add-user.dto';

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
  @Post()
  addUser(@Body() addUserDto: AddUserDto): Promise<UserEntity> {
    return this.userService.addUser(addUserDto);
  }
}
