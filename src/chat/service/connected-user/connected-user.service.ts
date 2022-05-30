import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUserEntity } from 'src/chat/entity/connected.user.entity';
import { ConnectedUserI } from 'src/chat/interfaces/connected.user.interface';
import { UserI } from 'src/chat/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {

    constructor(
        @InjectRepository(ConnectedUserEntity)
        private readonly connectedUserRepository: Repository<ConnectedUserEntity>,
    ) {}
    
    async create(conncetedUser : ConnectedUserI):Promise<ConnectedUserI>{
        return this.connectedUserRepository.save(conncetedUser);
    }

    async findByUser(user:UserI):Promise<ConnectedUserI[]>{
        return this.connectedUserRepository.find({user});
    }

    async deleteBySocketId(socketId:string){
        return this.connectedUserRepository.delete({socketId});
    }

    async deleteAll(){
        await this.connectedUserRepository
        .createQueryBuilder()
        .delete()
        .execute() ;
    }
}
