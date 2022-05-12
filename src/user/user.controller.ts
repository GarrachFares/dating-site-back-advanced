import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { CredentialsDto } from "./dto/credentials.dto";
import { diskStorage } from 'multer';
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./upload.utils";

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/profile-pictures' });
  }

}
