import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';

import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CategoryEntity } from "src/chat/entity/category.entity";



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addcategories')
  addCategories(@Body() categories: any,@User() user): Promise<UserEntity> {
    console.log("user : ",user);
   return this.userService.addCategories(categories.categories,user);

  }

  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  getUserCategories(@User() user): Promise<CategoryEntity[]> {
    return this.userService.getCategoriesForUser(user.id);
  }

  @Get('/:id')
  findOneById(@Param() id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }


  

  

}
