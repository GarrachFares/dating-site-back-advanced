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
import { MatchingModule } from 'src/matching/matching.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[TypeOrmModule.forFeature([RoomEntity,MessageEntity,UserEntity,ConnectedUserEntity,MessageEntity,JoinedRoomEntity,CategoryEntity]),AuthModule,MatchingModule,UserModule,JwtModule.register({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '10h' },
  }),
  
],
  providers: [ChatGateway, RoomService,MessageService,ConnectedUserService, JoinedRoomService,UserService],
  exports:[RoomService,MessageService]
})
export class ChatModule {}
