import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import * as bcrypt from 'bcrypt' ;
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
  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(addUserDto: AddUserDto) {
    return this.userRepository.save(addUserDto);
  }

  async register(userData : AddUserDto) : Promise<Partial<UserEntity>>{
    const user = this.userRepository.create({
      ...userData
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Le username et le email doivent être unique`);
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }

  async login(credentials: CredentialsDto) : Promise<Partial<UserEntity>> {
    const  {username , password}  = credentials ;
    /*
    * login via username or email
    * */
    const user = await this.userRepository.createQueryBuilder("user")
      .where("user.username = :username or user.email = :username",{username})
      .getOne()
    if(!user) throw new NotFoundException("username or password incorrect ") ;
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if(user.password===hashedPassword){
      return {
      username: user.username,
      email :   user.email
      }
    }
    else{
        throw new NotFoundException("username or password incorrect ") ;
    }
  }
}
