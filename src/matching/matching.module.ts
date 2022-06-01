import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from "./matching.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchingEntity } from "../chat/entity/matching.entity";
import { RoomService } from "../chat/service/room-service/room/room.service";
import { UserService } from "../user/user.service";
import { RoomEntity } from "../chat/entity/room.entity";
import { UserEntity } from "../user/entity/user.entity";
import { CategoryEntity } from "../chat/entity/category.entity";
import { ConnectedUserService } from 'src/chat/service/connected-user/connected-user.service';
import { ConnectedUserEntity } from 'src/chat/entity/connected.user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchingEntity,RoomEntity,UserEntity,CategoryEntity,ConnectedUserEntity])],
  controllers: [MatchingController],
  providers: [MatchingService,RoomService,UserService, ConnectedUserService],
  exports: [MatchingService]
})
export class MatchingModule {}
