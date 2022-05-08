import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions,paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PayloadInterface } from 'src/auth/interfaces/payload.interface';
import { RoomEntity } from 'src/chat/entity/room.entity';
import { RoomI } from 'src/chat/interfaces/room.interface';
import { UserEntity } from 'src/user/entity/user.entity';

import { Repository } from 'typeorm';

@Injectable()
export class RoomService {


  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>
  ) { }

  async createRoom(room: RoomI, creator: UserEntity): Promise<RoomI> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    return await this.roomRepository.save(newRoom);
  }

  async getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<RoomI>> {
    const query = this.roomRepository
    .createQueryBuilder('room')
    .leftJoin('room.users', 'user')
    .where('user.id = :userId', {userId})

    return paginate(query, options);
  }

  async addCreatorToRoom(room: RoomI, creator: UserEntity): Promise<RoomI> {
    room.users.push(creator);
    return room;

}}
