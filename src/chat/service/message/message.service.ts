import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

import { Repository, SelectQueryBuilder } from "typeorm";
import { MessageEntity } from "../../entity/message.entity";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { MessageI } from "../../interfaces/message.interface";
import { RoomEntity } from 'src/chat/entity/room.entity';
import { RoomI } from 'src/chat/interfaces/room.interface';

@Injectable()
export class MessageService {


  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) { }

  //TODO : change messageEntity to MessageI // done
  async create(message: MessageI): Promise<MessageI> {
   // const newMessage = await this.addCreatorToMessage(message, creator);
    return await this.messageRepository.save(this.messageRepository.create(message));
  }
//   async addCreatorToMessage(message:MessageEntity, creator: UserEntity): Promise<MessageEntity> {
//     message.user = creator;
//     return message;
//   }

  async findMessagesForRoom(room: RoomI, options: IPaginationOptions):Promise<Pagination<MessageI>> {

    const query = this.messageRepository
        .createQueryBuilder('message')
        .leftJoin('message.room','room')
        .where('room.id = :roomId', { roomId: room.id })
        .leftJoinAndSelect('message.user','user')
        .orderBy('message.created_at', 'ASC')

    return  paginate(query,options) ;
  }

//   async findMessages() {

//     const query = this.messageRepository
//     .createQueryBuilder('message')
//       .leftJoin('message.user','user')
//       .select(['message.message','message.created_at','user.username'])
//     .orderBy('message.created_at', 'ASC')

//     return query.getMany();
//     //return paginate(query,options);
//   }
}
