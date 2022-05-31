import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';

import { CredentialsDto } from "./dto/credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { CategoryEntity } from "src/chat/entity/category.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
 
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


  async addCategories(cats:number[],user:UserEntity): Promise<UserEntity> {
    //const user = await this.userService.findOne(id);
    if(!user) {
      throw new NotFoundException("You are not allowed to change username ") ;
    }
    const categories = await this.categoryRepository.createQueryBuilder('category')
    .where("category.id IN (:categories)", { categories: cats })
    .getMany();
    console.log("categories",categories);
    user.categories= categories
    return this.userRepository.save(user);
  }

  async getCategoriesForUser(id:number): Promise<CategoryEntity[]> {
    const user = await this.userRepository.findOne(id,{
      relations : ['categories']
    });
    if(!user) {
      throw new NotFoundException("no user found") ;
    }
    return user.categories;
  }

  // async getUsersForCategory(id:number): Promise<UserEntity[]> {
  //   const users = await this.userRepository.findOne(id,{
  //     relations : ['categories']
  //   });
  //   if(!user) {
  //     throw new NotFoundException("no user found") ;
  //   }
  //  // return user.categories;
  // }

  
}
