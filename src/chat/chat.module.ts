import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { RoomEntity } from './entity/room.entity';
import { ChatGateway } from './gateway/chat.gateway';
import { RoomService } from './service/room-service/room/room.service';
//import { MessageService } from "./service/room-service/message.service";
import { MessageEntity } from "./entity/message.entity";
import { ConnectedUserEntity } from './entity/connected.user.entity';
import { ConnectedUserService } from './service/connected-user/connected-user.service';
import { JoinedRoomEntity } from './entity/joined.room.entity';
import { JoinedRoomService } from './service/joined-room/joined-room.service';
import { MessageService } from './service/message/message.service';
import { CategoryEntity } from './entity/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoomEntity,MessageEntity,ConnectedUserEntity,MessageEntity,JoinedRoomEntity,CategoryEntity]),AuthModule,UserModule,JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '10h' },
  }),
  
],
  providers: [ChatGateway, RoomService,MessageService,ConnectedUserService, JoinedRoomService],
  exports:[RoomService,MessageService]
})
export class ChatModule {}
