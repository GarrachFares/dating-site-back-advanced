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

@Module({
  imports: [TypeOrmModule.forFeature([MatchingEntity,RoomEntity,UserEntity,CategoryEntity])],
  controllers: [MatchingController],
  providers: [MatchingService,RoomService,UserService],
  exports: [MatchingService]
})
export class MatchingModule {}
