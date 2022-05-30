// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserEntity } from 'src/user/entity/user.entity';

// import { Repository, SelectQueryBuilder } from "typeorm";
// import { MessageEntity } from "../../entity/message.entity";
// import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
// import { MessageI } from "../../interfaces/message.interface";

// @Injectable()
// export class MessageService {


//   constructor(
//     @InjectRepository(MessageEntity)
//     private readonly messageRepository: Repository<MessageEntity>
//   ) { }

//   //TODO : change messageEntity to MessageI
//   async createMessage(message: MessageEntity, creator: UserEntity): Promise<MessageEntity> {
//     const newMessage = await this.addCreatorToMessage(message, creator);
//     return await this.messageRepository.save(newMessage);
//   }
//   async addCreatorToMessage(message:MessageEntity, creator: UserEntity): Promise<MessageEntity> {
//     message.user = creator;
//     return message;
//   }

//   async findMessages() {

//     const query = this.messageRepository
//     .createQueryBuilder('message')
//       .leftJoin('message.user','user')
//       .select(['message.message','message.created_at','user.username'])
//     .orderBy('message.created_at', 'ASC')

//     return query.getMany();
//     //return paginate(query,options);
//   }
// }
