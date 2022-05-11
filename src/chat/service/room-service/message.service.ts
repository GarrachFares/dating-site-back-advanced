import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

import { Repository } from 'typeorm';
import { MessageEntity } from "../../entity/message.entity";

@Injectable()
export class MessageService {


  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) { }

  //TODO : change messageEntity to MessageI
  async createMessage(message: MessageEntity, creator: UserEntity): Promise<MessageEntity> {
    const newMessage = await this.addCreatorToMessage(message, creator);
    return await this.messageRepository.save(newMessage);
  }


  async addCreatorToMessage(message:MessageEntity, creator: UserEntity): Promise<MessageEntity> {
    message.user = creator;
    return message;

  }}
