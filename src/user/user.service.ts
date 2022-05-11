import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';

import { CredentialsDto } from "./dto/credentials.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(addUserDto: AddUserDto | UserEntity) {
    return this.userRepository.save(addUserDto);
  }

  async createUser(addUserDto: AddUserDto) {
    return this.userRepository.create(addUserDto);
  }

  async findUserByUsername(username: string) {
    return this.userRepository.createQueryBuilder("user")
          .where("user.username = :username or user.email = :username",{username})
          .getOne()

  }


  async updateUser(user: UserEntity ) {
    const id = user.id
    console.log(user);
    return await this.userRepository.update(id,user);
  }
}
