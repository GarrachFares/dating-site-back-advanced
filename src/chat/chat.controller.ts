import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { editFileName, imageFileFilter } from 'src/user/upload.utils';
import { RoomService } from './service/room-service/room/room.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly roomService: RoomService) {}

    @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/room-pictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedRoomImage(@UploadedFile() file,@Body() body: any) {
    console.log(file);
    console.log("the iiiiiiiiiid",body.id);
    
  
    return this.roomService.RoomImage(file.filename,body.id)

}

@Get('/image/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {

    console.log("sending profil image back");
    
    return res.sendFile(image, { root: './uploads/room-pictures' });
  }

}
