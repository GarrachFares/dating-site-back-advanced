import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(addUserDto: AddUserDto) {
    return this.userRepository.save(addUserDto);
  }
}
